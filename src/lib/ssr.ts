import { withIronSessionSsr } from 'iron-session/next'
import { GetServerSideProps } from 'next'
import { sessionOptions } from './session'

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { token, user } = req.session

  if (!token || !user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  if (!user?.first_name || !user?.last_name || !user?.username) {
    return {
      redirect: {
        destination: '/signup',
        permanent: true,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}, sessionOptions)

export default getServerSideProps
