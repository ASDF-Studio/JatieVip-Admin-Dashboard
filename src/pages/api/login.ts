import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = await req.body

  try {
    const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
