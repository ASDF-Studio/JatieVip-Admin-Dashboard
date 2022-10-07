import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { MainLayout } from 'components'
import { CreateSub } from 'ui/dashboard/'
import { SecurePage } from 'navigation'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { AuthService } from 'services'

const Home: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SecurePage>
      <MainLayout className="pt-[66px] px-5">
        <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)]" />
      </MainLayout>
    </SecurePage>
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
