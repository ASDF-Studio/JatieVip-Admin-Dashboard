import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { AuthProvider } from 'Contexts/Auth'
import { AuthService } from 'services'

import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { IUser } from 'services/types'
import { Profile } from 'ui/account'

type Props = {
  user: IUser
}

const Account: NextPage = ({ user }: Props) => {
  return (
    <AuthProvider userContext={user}>
      <MainLayout className="pt-[66px] px-5">
        <Profile />
      </MainLayout>
    </AuthProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { token, destroy } = req.session

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  try {
    const user = await AuthService.getAccount({ token })

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
  } catch (e) {
    destroy()
  }

  return {
    props: {},
  }
}, sessionOptions)

export default Account
