/* eslint-disable no-useless-escape */
import { isEmpty, xor } from 'lodash'
import { release } from 'process'
import { IProductNames, IUser } from 'services/types'
import Stripe from 'stripe'
import { StripeError } from './error'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

export const subscriptionPlans: IProductNames[] = ['Monthly', '3-Months', '6-Months', '1 Year']

export const createStripeUser = async (user: IUser): Promise<Stripe.Customer> => {
  if (!user) {
    throw new StripeError('please fill required values', {
      statusCode: 400,
    })
  }

  const testClock = await stripe.testHelpers.testClocks.create({
    frozen_time: 1666084914,
    name: 'Annual renewal',
  })

  try {
    const newCustomer = await stripe.customers.create({
      phone: user.phone_number,
      name: user?.username || '',
      metadata: {
        moveUserId: user.id,
      },
      test_clock: testClock.id,
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
  productName: IProductNames
}

export const createStripeSession = async ({
  stripeUserId,
  productName,
}: CreateSessionType): Promise<Stripe.Checkout.Session> => {
  if (!stripeUserId || !productName) {
    throw new StripeError('please fill required values', {
      statusCode: 400,
    })
  }

  try {
    const { data } = await stripe.products.search({
      query: `active:\'true\' AND name:\'${productName}\'`,
      limit: 1,
    })

    if (data.length === 0) {
      throw new StripeError('product not found', {
        statusCode: 400,
      })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      mode: 'subscription',
      customer: stripeUserId,
      billing_address_collection: 'required',
      line_items: [
        {
          price: data[0].default_price as string,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
      },
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

export const getStripeUserSubs = async ({
  stripeCustomerId,
}: GetSubsParams): Promise<Stripe.Subscription | null | StripeError> => {
  try {
    const stripeSub = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      expand: ['data.schedule.phases.plans', 'data.latest_invoice'],
      status: 'all',
    })

    const subscription = stripeSub.data.filter(
      (x) =>
        x.status !== 'canceled' &&
        x.status !== 'incomplete_expired' &&
        x.status !== 'unpaid' &&
        x.status !== 'incomplete',
    )

    if (subscription.length === 1) {
      return subscription[0]
    }

    return null
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
    const { data } = await stripe.products.search({
      query: `active:\'true\' AND name:\'${productName}\'`,
      limit: 1,
    })

    if (data.length === 0) {
      throw new StripeError('product not found', {
        statusCode: 400,
      })
    }

    let { schedule } = subscription

    if (isEmpty(schedule)) {
      schedule = await stripe.subscriptionSchedules.create({
        from_subscription: subscription.id,
      })
    }

    const updatedSchedulesSub = await stripe.subscriptionSchedules.update(schedule.id, {
      phases: [
        {
          start_date: subscription.current_period_start,
          end_date: subscription.current_period_end,
          items: [
            {
              price: subscription.items.data[0].price.id,
            },
          ],
        },
        {
          start_date: subscription.current_period_end,
          items: [
            {
              price: data[0].default_price as string,
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

type AddNewPhaseToSubs = {
  currentSubs: Stripe.Subscription
  productName: string
}

export const addNewPhaseToSubs = async ({
  productName,
  currentSubs,
}: AddNewPhaseToSubs): Promise<Stripe.SubscriptionSchedule> => {
  try {
    const { data } = await stripe.products.search({
      query: `active:\'true\' AND name:\'${productName}\'`,
      limit: 1,
    })

    if (data.length === 0) {
      throw new StripeError('product not found', {
        statusCode: 400,
      })
    }

    const updatedSchedulesSub = await stripe.subscriptionSchedules.update(schedule.id, {
      phases: [
        {
          start_date: currentSubs.current_period_start,
          end_date: currentSubs.current_period_end,
          items: [
            {
              price: currentSubs.items.data[0].price.id,
            },
          ],
        },
        {
          start_date: currentSubs.current_period_end,
          items: [
            {
              price: data[0].default_price as string,
            },
          ],
        },
      ],
    })

    return updatedSchedulesSub
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
  currentSubs: Stripe.Subscription
  productName: string
}

export const updateTrialSubs = async ({ currentSubs, productName }: UpdateTrialSubs) => {
  try {
    const { data } = await stripe.products.search({
      query: `active:\'true\' AND name:\'${productName}\'`,
      limit: 1,
    })

    if (data.length === 0) {
      throw new StripeError('product not found', {
        statusCode: 400,
      })
    }

    const updateTrialSubs = await stripe.subscriptions.update(currentSubs.id, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
      items: [
        {
          quantity: 1,
          id: currentSubs.items.data[0].id,
          deleted: true,
        },
        {
          quantity: 1,
          price: data[0].default_price as string,
        },
      ],
    })

    return updateTrialSubs
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
