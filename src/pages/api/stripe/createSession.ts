import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { createStripeSession, createStripeUser, getStripeUserSubs, subscriptionPlans, UserSubsType } from 'lib/stripe'
import { AccountService, AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'

const createStripeSesionRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(400).json({
      message: 'only post request',
    })

    return
  }

  if (!req.session.token) {
    res.status(401).send('unauthorized')

    return
  }
  const { token } = req.session

  try {
    const user = await AuthService.getAccount({
      token,
    })

    delete user.myPreference
    delete user.userGoals
    delete user.enrolledPrograms

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

  const { selectedProduct } = req.body

  if (!selectedProduct) {
    res.status(400).json({
      message: 'product name required',
    })

    return
  }

  const plan = subscriptionPlans.findIndex((prods) => prods.name === selectedProduct)

  if (plan === -1) {
    res.status(400).json({
      message: 'please inculed valid product name',
    })

    return
  }

  if (!req.session.user.stripe_customer_id) {
    try {
      const stripeUser = await createStripeUser(req.session.user)
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

  const stripeCustomerId = req.session.user.stripe_customer_id

  const { subs: stripeSub, isTrialUsed } =
    ((await getStripeUserSubs({
      stripeCustomerId,
    })) as UserSubsType) || {}

  if (stripeSub) {
    res.status(400).json({
      message: 'user already has active subs',
    })

    return
  }

  if (req.session.user.subscribed) {
    res.status(400).json({
      message: 'user subscribed using mobile app',
    })

    return
  }

  try {
    const session = await createStripeSession({
      stripeUserId: stripeCustomerId,
      productName: subscriptionPlans[plan].stripePriceId,
      withTrial: !isTrialUsed,
    })

    res.status(200).json({
      data: session,
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
