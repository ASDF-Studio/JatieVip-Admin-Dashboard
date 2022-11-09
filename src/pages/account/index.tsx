import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { AuthProvider } from 'Contexts/Auth'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { IUser } from 'services/types'
import { Profile } from 'ui/account'
import Head from 'next/head'

type Props = {
  user: IUser
}

const Account: NextPage = ({ user }: Props) => {
  return (
    <AuthProvider userContext={user}>
      <Head>
        <title>Profile</title>
      </Head>
      <MainLayout className="pt-[66px] px-5">
        <Profile />
      </MainLayout>
    </AuthProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { token, destroy, user } = req.session

  if (!token || !user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }
  
  try {
    if (!user?.first_name || !user?.last_name || !user?.username || !user.date_of_birth || !user.gender) {
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
  } catch (e) {
    destroy()
  }

  return {
    props: {},
  }
}, sessionOptions)

export default Account
