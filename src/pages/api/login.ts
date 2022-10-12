import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import admin from 'lib/firebase'
import { isEmpty } from 'lodash'
import { IUser } from 'services/types'

const createFirebaseAndStripeAccount = async (user: IUser) => {
  const auth = admin.auth()

  const record = await auth.getUserByPhoneNumber(phoneNumber)

  if (isEmpty(record)) {
    const firebaseUser = await auth.createUser({
      phoneNumber: user.phone_number,
      disabled: false,
    })
  }
}

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNumber, token } = req.body

  if (typeof phoneNumber !== 'string' || typeof token !== 'number') {
    res.status(401).json({ message: 'validation error' })
  }

  try {
    const data = await AuthService.verifyLogin({
      phoneNumber,
      token,
    })
    const user = await AuthService.getAccount({ token: data.token })
    req.session.token = data.token
    req.session.user = user
    await req.session.save()
    res.status(200).json({})
  } catch (error) {
    if (error instanceof ApiErrorResponse) {
      if (error.statusCode === 401) {
        req.session.destroy()
        res.status(401).json({
          message: error.message,
        })
      } else {
        res.status(400).json({
          message: error.message,
        })
      }
    } else {
      res.status(500).json({ message: (error as Error).message })
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
