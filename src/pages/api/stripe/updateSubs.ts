import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeUserSubs, ReleaseSchedule, updateStripeSub, UserSubsType } from 'lib/stripe'
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
    req.session.user = user
    await req.session.save()
  } catch (e) {
    if (e instanceof ApiErrorResponse) {
      if (e.statusCode === 401) {
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

  const { endAtThePeriod = undefined } = req.body

  if (endAtThePeriod === undefined) {
    res.status(400).json({
      message: 'please include endoftheperiod',
    })

    return
  }

  let stripeSub: Stripe.Subscription & { schedule: Stripe.SubscriptionSchedule }

  try {
    const subscription = (await getStripeUserSubs({
      stripeCustomerId: req.session.user.stripe_customer_id,
    })) as UserSubsType
    stripeSub = subscription.subs
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

  if (!isEmpty(stripeSub.schedule)) {
    try {
      await ReleaseSchedule({ scheduleId: stripeSub.schedule.id })
    } catch (e) {
      if (e instanceof StripeError) {
        res.status(e.statusCode).json({
          message: e.message,
        })

        return
      }
      res.status(500).send('')

      return
    }
  }

  try {
    const updateSub = await updateStripeSub({
      currentSub: stripeSub,
      cancelAtPeriod: endAtThePeriod,
    })

    res.status(200).json({
      data: updateSub,
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
