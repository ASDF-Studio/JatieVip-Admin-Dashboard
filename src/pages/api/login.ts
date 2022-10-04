import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'

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

    req.session.token = data.token
    await req.session.save()
    res.status(200).json({})
  } catch (error) {
    if (error instanceof ApiErrorResponse) {
      res.status(400).json({
        message: error.message,
      })
    } else {
      res.status(500).json({ message: (error as Error).message })
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
