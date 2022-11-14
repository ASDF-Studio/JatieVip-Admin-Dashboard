import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { getStripeUserSubs, UserSubsType } from 'lib/stripe'
import { AccountService, AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { StripeError } from 'lib/error'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(200).json({
      subs: null,
    })

    return
  }

  try {
    const { subs: stripeSub } =
      ((await getStripeUserSubs({
        stripeCustomerId: req.session.user.stripe_customer_id,
      })) as UserSubsType) || {}

    res.status(200).json({
      data: stripeSub,
    })
  } catch (e) {
    if (e instanceof StripeError) {
      if (e.message.includes('No such customer:')) {
        try {
          const acc = await AccountService.updateAccount({
            stripe_customer_id: null,
            jwttoken: req.session.token,
          })
          req.session.user = acc
          await req.session.save()

          res.status(200).json({
            data: null,
          })

          return
        } catch (e) {
          console.log(e)
        }
      }

      res.status(e.statusCode).json({
        message: e.message,
      })

      return
    }
    res.status(500).send('')
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
