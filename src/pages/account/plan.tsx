import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { ManageSub } from 'ui/dashboard/'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { AuthProvider } from 'Contexts/Auth'
import { IUser } from 'services/types'
import { useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'

type Props = {
  user: IUser
}

const Home: NextPage<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [userSubs, setUserSubs] = useState(null)

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      setLoading(true)
      const res = await StripeService.getUserSubs()
      setUserSubs(res)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthProvider userContext={user}>
      <MainLayout className="pt-[66px] px-5">
        {loading ? (
          <div>Loading</div>
        ) : (
          userSubs && (
            <ManageSub
              sub={userSubs}
              className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] sm:mt-[53px] mb-[50px] "
            />
          )
        )}
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
