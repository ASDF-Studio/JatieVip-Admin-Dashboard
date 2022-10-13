/* eslint-disable no-useless-escape */
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
  productName: string
  cancelAtPeriod: boolean
}

export const updateStripeSub = async ({ currentSub, productName, cancelAtPeriod }: UpdateStripeSubParams) => {
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

    const stripeSub = await stripe.subscriptions.update(currentSub.id, {
      cancel_at_period_end: cancelAtPeriod,
      items: [
        {
          id: currentSub.items.data[0].id,
          price: data[0].default_price as string,
        },
      ],
    })

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
