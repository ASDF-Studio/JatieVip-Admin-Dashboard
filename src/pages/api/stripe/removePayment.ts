import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeUserSubs, removePaymentMethod } from 'lib/stripe'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import Stripe from 'stripe'
import { StripeError } from 'lib/error'
import { isEmpty } from 'lodash'

const UpdateSubsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session.token) {
    res.status(401).send('unauthorized')

    return
  }

  try {
    const user = await AuthService.getAccount({
      token: req.session.token,
    })

    delete user.myPreference
    delete user.userGoals
    delete user.enrolledPrograms

    req.session.user = user
    await req.session.save()
  } catch (e) {
    if (e instanceof ApiErrorResponse) {
      if (e.statusText === 'Unauthorized') {
        req.session.destroy()
        res.status(401).json({
          message: 'unauthorized',
        })
      } else {
        res.status(400).json({
          message: e.message,
        })
      }
    } else {
      res.status(500).json({
        message: 'cannot connect to server',
      })
    }

    return
  }

  if (!req.session.user.stripe_customer_id) {
    res.status(400).json({
      message: 'please subscribe first',
    })

    return
  }

  let stripeSub: Stripe.Subscription & {
    schedule: Stripe.SubscriptionSchedule
    default_payment_method: Stripe.PaymentMethod
  }

  try {
    stripeSub = (await getStripeUserSubs({
      stripeCustomerId: req.session.user.stripe_customer_id,
    })) as Stripe.Subscription & {
      schedule: Stripe.SubscriptionSchedule
      default_payment_method: Stripe.PaymentMethod
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }

  if (isEmpty(stripeSub)) {
    res.status(400).json({
      message: 'please subscribe first',
    })
  }

  if (!stripeSub.default_payment_method) {
    res.status(400).json({
      message: 'no payment method attached to subs',
    })
  }

  try {
    await removePaymentMethod({
      paymentMethodId: stripeSub.default_payment_method.id,
    })
    stripeSub.default_payment_method = null
    res.status(200).json({
      data: stripeSub,
    })
  } catch (e) {
    if (e instanceof StripeError) {
      res.status(e.statusCode).json({
        message: e.message,
      })

      return
    }
    res.status(500).send('')
  }
}

export default withIronSessionApiRoute(UpdateSubsRoute, sessionOptions)
