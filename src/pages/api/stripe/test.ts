import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { createStripeSession, createStripeUser } from 'lib/stripe'
import { AccountService } from 'services'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session.token || !req.session.user) {
    res.status(401).send('unauthorized')

    return
  }

  const { user, token } = req.session

  if (!user.stripe_customer_id) {
    try {
      const stripeUser = await createStripeUser(user)
      const updatedUser = await AccountService.updateAccount({
        stripe_customer_id: stripeUser.id,
        jwttoken: token,
      })
      req.session.user = updatedUser
      await req.session.save()
    } catch (e) {
      res.status(400).json({
        message: 'error while createing user',
      })

      return
    }
  }

  try {
    const session = await createStripeSession({ stripeUserId: user.stripe_customer_id, productName: '3-Months' })
    console.log(session)
    res.status(200).json({
      qwe: 'pzda',
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        message: 'error creating stripe session',
        error: e.message,
      })
    } else {
      res.status(500).json({
        message: 'server error',
      })
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
