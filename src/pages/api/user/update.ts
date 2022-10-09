import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { AccountService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { IUser } from 'services/types'

const userRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<(Partial<IUser> & { isLoggedIn: boolean }) | { message: string }>,
) => {
  if (req.session.token) {
    
    try {
      const acc = await AccountService.updateAccount({
        ...req.body,
        jwttoken: req.session.token,
      })

      res.status(200).json({
        ...acc,
        isLoggedIn: true,
      })
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
    }
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
