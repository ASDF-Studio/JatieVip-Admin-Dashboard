import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { CreateSub, CurrentSub } from 'ui/dashboard/'
import { sessionOptions } from 'lib/session'
import { AuthService } from 'services'
import { withIronSessionSsr } from 'iron-session/next'
import { IUser } from 'services/types'
import { AuthProvider } from 'Contexts/Auth'

type Props = {
  user: IUser
}

const Home: NextPage = ({ user }: Props) => {
  return (
    <AuthProvider userContext={user}>
      <MainLayout className="pt-[66px] px-5">
        {user.isSubscribed ? (
          <CurrentSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] sm:mt-[53px] min-h-[calc(100vh-209px)]" />
        ) : (
          <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)]" />
        )}
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

export default Home
