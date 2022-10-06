import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { IUser } from 'services/types'

const userRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<(Partial<IUser> & { isLoggedIn: boolean }) | { message: string }>,
) => {
  if (req.session.token) {
    try {
      const acc = await AuthService.getAccount({ token: req.session.token })
      res.json({
        ...acc,
        isLoggedIn: true,
      })
    } catch (e) {
      if (e instanceof ApiErrorResponse) {
        res.status(400).json({
          message: e.message,
        })
      } else {
        res.status(500).json({
          message: 'cannot connect to server',
        })
      }
    }
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
