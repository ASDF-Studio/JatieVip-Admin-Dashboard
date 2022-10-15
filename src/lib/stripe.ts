/* eslint-disable no-useless-escape */
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

  try {
    const newCustomer = await stripe.customers.create({
      phone: user.phone_number,
      name: user?.username || '',
      metadata: {
        moveUserId: user.id,
      },
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
      line_items: [
        {
          price: data[0].default_price as string,
          quantity: 1,
        },
      ],
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
    const stripeSub = await stripe.subscriptions.list({ customer: stripeCustomerId, status: 'active' })

    if (stripeSub.data.length === 1) {
      return stripeSub.data[0]
    }

    return null
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
  subscription: Stripe.Subscription
}

export const createSubSchedules = async ({
  productName,
  subscription,
}: SchedulesType): Promise<Stripe.SubscriptionSchedule> => {
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

    const schedulesSub = await stripe.subscriptionSchedules.create({
      from_subscription: subscription.id,
    })

    const updatedSchedulesSub = await stripe.subscriptionSchedules.update(schedulesSub.id, {
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
  scheduleId: string
}

export const updateStripeScheduleSub = async ({ endBehavior, scheduleId }: UpdateSubScheduleParams) => {
  try {
    const updatedSchedule = await stripe.subscriptionSchedules.update(scheduleId, {
      end_behavior: endBehavior,
    })

    return updatedSchedule
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
