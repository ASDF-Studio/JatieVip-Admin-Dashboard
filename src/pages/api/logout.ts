import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<any>) => {
  req.session.destroy()
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
