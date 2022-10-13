import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeUserSubs } from 'lib/stripe'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(200).json({
      subs: null,
    })

    return
  }

  try {
    const stripeSub = await getStripeUserSubs({
      stripeCustomerId: req.session.user.stripe_customer_id,
    })

    res.status(200).json({
      subs: stripeSub,
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
