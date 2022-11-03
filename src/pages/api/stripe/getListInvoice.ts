import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeUserSubs, ListAllCustomerInvoices, UserSubsType } from 'lib/stripe'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { StripeError } from 'lib/error'
import { isString } from 'lodash'

const getListInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const { startingAfter } = req.body

  if (!isString(startingAfter)) {
    res.status(400).json({
      message: 'please include valid value to req',
    })
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

  try {
    const listInvoice = await ListAllCustomerInvoices({
      subscriptionId: stripeSub.id,
      startingAfter: startingAfter === '' ? null : startingAfter,
    })

    res.status(200).json({
      data: listInvoice,
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

export default withIronSessionApiRoute(getListInvoice, sessionOptions)
