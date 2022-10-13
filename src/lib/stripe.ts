import { IProductNames, IUser } from 'services/types'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

export const subscriptionPlans: IProductNames[] = ['Monthly', '3-Months', '6-Months', '1 Year']

export const createStripeUser = async (user: IUser): Promise<Stripe.Customer> => {
  if (!user) {
    throw new Error('user required')
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
    throw new Error(e)
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
    throw new Error('stripeUserId required')
  }

  try {
    const { data } = await stripe.products.search({
      query: `active:\'true\' AND name:\'${productName}\'`,
      limit: 1,
    })

    if (data.length === 0) {
      throw new Error('product not found')
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
    throw new Error(e)
  }
}

type GetSubsParams = {
  stripeCustomerId: string
}

export const getStripeUserSubs = async ({ stripeCustomerId }: GetSubsParams): Promise<Stripe.Subscription> => {
  try {
    const stripeSub = await stripe.subscriptions.list({ customer: stripeCustomerId, status: 'active' })

    if (stripeSub.data.length === 1) {
      return stripeSub.data[0]
    }

    return null
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
