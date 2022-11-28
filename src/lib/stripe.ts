/* eslint-disable no-useless-escape */
import { IProductNames, IUser } from 'services/types'
import Stripe from 'stripe'
import { StripeError } from './error'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

export const subscriptionPlans: {
  name: IProductNames
  stripePriceId: string
  weight: number
}[] = [
  {
    name: 'Monthly',
    stripePriceId: process.env.MONTHLY_PRICEID,
    weight: 1,
  },
  {
    name: '6-Months',
    stripePriceId: process.env.SIX_MONTH_PRICEID,
    weight: 6,
  },
  {
    name: '3-Months',
    stripePriceId: process.env.THREE_MONTH_PRICEID,
    weight: 3,
  },
  {
    name: '1 Year',
    stripePriceId: process.env.YEAR_PRICEID,
    weight: 12,
  },
]

export const createStripeUser = async (user: IUser): Promise<Stripe.Customer> => {
  if (!user) {
    throw new StripeError('please fill required values', {
      statusCode: 400,
    })
  }
  let testClock = null

  if (process.env?.STATUS === 'development') {
    testClock = await stripe.testHelpers.testClocks.create({
      frozen_time: Math.floor(Date.now() / 1000),
      name: 'Test',
    })
  }

  try {
    const newCustomer = await stripe.customers.create({
      phone: user.phone_number,
      name: user?.username || '',
      metadata: {
        moveUserId: user.id,
      },
      ...(testClock && {
        test_clock: testClock.id,
      }),
    })

    return newCustomer
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type CreateSessionType = {
  stripeUserId: string
  productName: string
  withTrial: boolean
}

export const createStripeSession = async ({
  stripeUserId,
  productName,
  withTrial,
}: CreateSessionType): Promise<Stripe.Checkout.Session> => {
  if (!stripeUserId || !productName) {
    throw new StripeError('please fill required values', {
      statusCode: 400,
    })
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      mode: 'subscription',
      customer: stripeUserId,
      // billing_address_collection: 'required',
      line_items: [
        {
          price: productName,
          quantity: 1,
        },
      ],
      ...(withTrial && {
        subscription_data: {
          trial_period_days: 7,
        },
      }),
    })

    return stripeSession
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type GetSubsParams = {
  stripeCustomerId: string
}

export type UserSubsType = {
  subs: Stripe.Subscription & { schedule: Stripe.SubscriptionSchedule; latest_invoice: Stripe.Invoice }
  isTrialUsed: boolean
}

export const getStripeUserSubs = async ({
  stripeCustomerId,
}: GetSubsParams): Promise<UserSubsType | null | StripeError> => {
  try {
    const stripeSub = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      expand: ['data.schedule.phases.plans', 'data.latest_invoice', 'data.default_payment_method'],
      status: 'all',
    })

    const subscription = stripeSub.data.filter(
      (x) =>
        x.status !== 'canceled' &&
        x.status !== 'incomplete_expired' &&
        x.status !== 'unpaid' &&
        x.status !== 'incomplete',
    )

    const isTrialUsed = stripeSub.data.filter((x) => x.status === 'canceled').length > 0

    return {
      subs: subscription[0] as Stripe.Subscription & {
        schedule: Stripe.SubscriptionSchedule
        latest_invoice: Stripe.Invoice
      },
      isTrialUsed,
    }
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      if (e.message.includes('No such customer')) {
        throw new StripeError(e.message, {
          statusCode: e.statusCode,
        })
      }

      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type UpdateStripeSubParams = {
  currentSub: Stripe.Subscription
  cancelAtPeriod: boolean
}

export const updateStripeSub = async ({ currentSub, cancelAtPeriod }: UpdateStripeSubParams) => {
  try {
    const updatedSub = await stripe.subscriptions.update(currentSub.id, {
      cancel_at_period_end: cancelAtPeriod,
    })

    return updatedSub
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type SchedulesType = {
  productName: string
  subscription: Stripe.Subscription & { schedule: Stripe.SubscriptionSchedule }
}

export const createSubSchedules = async ({
  productName,
  subscription,
}: SchedulesType): Promise<Stripe.Subscription> => {
  try {
    const schedule = await stripe.subscriptionSchedules.create({
      from_subscription: subscription.id,
    })

    const updatedSchedulesSub = await stripe.subscriptionSchedules.update(schedule.id, {
      phases: [
        {
          proration_behavior: 'none',
          start_date: subscription.current_period_start,
          end_date: subscription.current_period_end,
          items: [
            {
              price: subscription.items.data[0].price.id,
            },
          ],
        },
        {
          proration_behavior: 'none',
          start_date: subscription.current_period_end,
          items: [
            {
              price: productName,
            },
          ],
        },
      ],
      expand: ['subscription.schedule'],
    })

    return updatedSchedulesSub.subscription as Stripe.Subscription
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      console.log(e)
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type GetUserInvoiceType = {
  subsId: string
}

export const getUserInvoices = async ({ subsId }: GetUserInvoiceType): Promise<Stripe.Invoice> => {
  try {
    const userInvpois = await stripe.invoices.retrieveUpcoming({
      subscription: subsId,
    })

    return userInvpois
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type UpdateSubScheduleParams = {
  endBehavior: Stripe.SubscriptionScheduleUpdateParams.EndBehavior
  subscription: Stripe.Subscription & { schedule: Stripe.SubscriptionSchedule }
}

export const updateStripeScheduleSub = async ({ endBehavior, subscription }: UpdateSubScheduleParams) => {
  let updatedSchedule: Stripe.SubscriptionSchedule
  try {
    if (endBehavior === 'cancel') {
      updatedSchedule = await stripe.subscriptionSchedules.update(subscription.schedule.id, {
        end_behavior: 'cancel',
        phases: [
          {
            end_date: subscription.current_period_end,
            start_date: subscription.current_period_start,
            items: [
              {
                quantity: 1,
                plan: subscription.items.data[0].price.id,
              },
            ],
          },
        ],
        expand: ['subscription.schedule'],
      })
    } else {
      updatedSchedule = await stripe.subscriptionSchedules.update(subscription.schedule.id, {
        end_behavior: endBehavior,
        expand: ['subscription.schedule'],
      })
    }

    return updatedSchedule.subscription
  } catch (e) {
    console.log(e)
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type GetUpcomingSubsParams = {
  subsId: string
}

export const getUpcomingSubsInvoice = async ({ subsId }: GetUpcomingSubsParams) => {
  try {
    const upComingInvoice = await stripe.invoices.retrieveUpcoming({
      subscription: subsId,
    })

    return upComingInvoice
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type GetSubsScheduleParams = {
  scheduleId: string
}

export const getStripeSubsSchedule = async ({ scheduleId }: GetSubsScheduleParams) => {
  try {
    const subSchedule = await stripe.subscriptionSchedules.retrieve(scheduleId)

    return subSchedule
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

// type AddNewPhaseToSubs = {
//   currentSubs: Stripe.Subscription
//   productName: string
// }

// export const addNewPhaseToSubs = async ({
//   productName,
//   currentSubs,
// }: AddNewPhaseToSubs): Promise<Stripe.SubscriptionSchedule> => {
//   try {
//     const updatedSchedulesSub = await stripe.subscriptionSchedules.update(schedule.id, {
//       phases: [
//         {
//           start_date: currentSubs.current_period_start,
//           end_date: currentSubs.current_period_end,
//           items: [
//             {
//               price: currentSubs.items.data[0].price.id,
//             },
//           ],
//         },
//         {
//           start_date: currentSubs.current_period_end,
//           items: [
//             {
//               price: productName,
//             },
//           ],
//         },
//       ],
//     })

//     return updatedSchedulesSub
//   } catch (e) {
//     if (e instanceof Stripe.errors.StripeError) {
//       console.log(e)
//       throw new StripeError(e.code, {
//         statusCode: e.statusCode,
//       })
//     } else {
//       throw new StripeError('cannot connect to server', {
//         statusCode: 500,
//       })
//     }
//   }
// }

type ListAllCustomerInvoieParams = {
  subscriptionId: string
  startingAfter: string
}

export const ListAllCustomerInvoices = async ({
  subscriptionId,
  startingAfter = null,
}: ListAllCustomerInvoieParams) => {
  try {
    const userInvpois = await stripe.invoices.list({
      subscription: subscriptionId,
      limit: 3,
      status: 'paid',
      ...(startingAfter && {
        starting_after: startingAfter,
      }),
    })

    return userInvpois
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type UpdateTrialSubs = {
  currentSubs: Stripe.Subscription & { schedule: Stripe.SubscriptionSchedule }
  productName: string
}

export const updateTrialSubs = async ({ currentSubs, productName }: UpdateTrialSubs) => {
  try {
    const updateTrialSubs = await stripe.subscriptions.update(currentSubs.id, {
      payment_behavior: 'error_if_incomplete',
      proration_behavior: 'none',
      items: [
        {
          quantity: 1,
          id: currentSubs.items.data[0].id,
          deleted: true,
        },
        {
          quantity: 1,
          price: productName,
        },
      ],
      off_session: true,
    })

    return updateTrialSubs
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      console.log(e)
      throw new StripeError(e?.code, {
        statusCode: e?.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type DetachPaymentParams = {
  paymentMethodId: string
}

export const removePaymentMethod = async ({ paymentMethodId }: DetachPaymentParams) => {
  try {
    await stripe.paymentMethods.detach(paymentMethodId)
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}

type RealeaseScheduleParams = {
  scheduleId: string
}

export const ReleaseSchedule = async ({ scheduleId }: RealeaseScheduleParams) => {
  try {
    await stripe.subscriptionSchedules.release(scheduleId, {
      preserve_cancel_date: true,
    })
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}


export const test = async ({ currentSub, cancelAtPeriod }: UpdateStripeSubParams) => {
  try {
    const updatedSub = await stripe.subscriptions.update(currentSub.id, {
      cancel_at_period_end: cancelAtPeriod,
    })



    return updatedSub
  } catch (e) {
    if (e instanceof Stripe.errors.StripeError) {
      throw new StripeError(e.code, {
        statusCode: e.statusCode,
      })
    } else {
      throw new StripeError('cannot connect to server', {
        statusCode: 500,
      })
    }
  }
}