import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { createStripeSession, createStripeUser } from 'lib/stripe'
import { AccountService } from 'services'

const createStripeSesionRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(400).json({
      message: 'only post request',
    })

    return
  }

  if (!req.session.token || !req.session.user) {
    res.status(401).send('unauthorized')

    return
  }

  const { selectedProduct } = req.body

  if (!selectedProduct) {
    res.status(401).json({
      message: 'product name required',
    })

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
        message: 'error while creating stripe user',
      })

      return
    }
  }

  try {
    const session = await createStripeSession({ stripeUserId: user.stripe_customer_id, productName: selectedProduct })

    res.status(200).json({
      session,
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

export default withIronSessionApiRoute(createStripeSesionRoute, sessionOptions)
