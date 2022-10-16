import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeSubsSchedule, getStripeUserSubs } from 'lib/stripe'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { StripeError } from 'lib/error'
import Stripe from 'stripe'

const getSubsSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session.token) {
    res.status(401).send('unauthorized')

    return
  }

  try {
    const user = await AuthService.getAccount({
      token: req.session.token,
    })

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

  const stripeSub = (await getStripeUserSubs({
    stripeCustomerId: req.session.user.stripe_customer_id,
  })) as Stripe.Subscription

  if (!stripeSub) {
    res.status(400).json({
      message: 'please subscribe first',
    })

    return
  }

  if (!stripeSub.schedule) {
    res.status(400).json({
      message: "you don't have any schedule",
    })

    return
  }

  try {
    const subsSchedule = await getStripeSubsSchedule({
      scheduleId: stripeSub.schedule as string,
    })

    res.status(200).json({
      data: subsSchedule,
    })
  } catch (e) {
    if (e instanceof StripeError) {
      res.status(e.statusCode).json({
        message: e.message,
      })
    }
    res.status(500).send('')
  }
}

export default withIronSessionApiRoute(getSubsSchedule, sessionOptions)
