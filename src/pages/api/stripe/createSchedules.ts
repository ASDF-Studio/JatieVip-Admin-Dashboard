import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import {
  createSubSchedules,
  getStripeUserSubs,
  ReleaseSchedule,
  subscriptionPlans,
  updateTrialSubs,
  UserSubsType,
} from 'lib/stripe'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { StripeError } from 'lib/error'
import { isEmpty } from 'lodash'

const createScheduleSub = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const { selectedProduct } = req.body

  if (!selectedProduct) {
    res.status(400).json({
      message: 'product name required',
    })

    return
  }

  const index = subscriptionPlans.findIndex((prods) => prods.name === selectedProduct)

  if (index === -1) {
    res.status(400).json({
      message: 'please inculed valid product name',
    })

    return
  }

  const { subs: stripeSub } =
    ((await getStripeUserSubs({
      stripeCustomerId: req.session.user.stripe_customer_id,
    })) as UserSubsType) || {}

  if (!stripeSub) {
    res.status(400).json({
      message: 'please subscribe first',
    })

    return
  }

  if (stripeSub.cancel_at) {
    res.status(400).json({
      message: 'please reactive subs first',
    })

    return
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

  if (stripeSub.status === 'trialing') {
    try {
      const stripeSubs = await updateTrialSubs({
        currentSubs: stripeSub,
        productName: subscriptionPlans[index].stripePriceId,
      })
      res.status(200).json({
        data: stripeSubs,
      })

      return
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

  const currentPlanIndex = subscriptionPlans.findIndex(
    (prods) => prods.stripePriceId === stripeSub?.items?.data?.[0].price.id,
  )

  const isDowngrade = subscriptionPlans[index].weight < subscriptionPlans[currentPlanIndex].weight

  const isLatestInvoicePaid = stripeSub.latest_invoice.status === 'paid'

  if (isDowngrade) {
    try {
      const scheduleSub = await createSubSchedules({
        subscription: stripeSub,
        productName: subscriptionPlans[index].stripePriceId,
      })

      res.status(200).json({
        data: scheduleSub,
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
  } else {
    if (!isLatestInvoicePaid) {
      res.status(400).json({
        message: 'latest invoice is not paid',
      })

      return
    }

    try {
      const stripeSubs = await updateTrialSubs({
        currentSubs: stripeSub,
        productName: subscriptionPlans[index].stripePriceId,
      })
      res.status(200).json({
        data: stripeSubs,
      })

      return
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
}

export default withIronSessionApiRoute(createScheduleSub, sessionOptions)
