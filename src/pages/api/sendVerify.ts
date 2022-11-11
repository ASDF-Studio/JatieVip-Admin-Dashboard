import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { isEmpty } from 'lodash'

const verifyRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNumber } = req.body

  if (typeof phoneNumber !== 'string' || isEmpty(phoneNumber)) {
    res.status(400).json({ message: 'validation error' })
  }
  
  try {
    await AuthService.login({
      phoneNumber,
    })

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

export default withIronSessionApiRoute(verifyRoute, sessionOptions)
