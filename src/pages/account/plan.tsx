import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { ManageSub } from 'ui/dashboard/'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { AuthProvider } from 'Contexts/Auth'
import { IUser } from 'services/types'
import { useCallback, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { useRouter } from 'next/router'
import { StripeError } from 'lib/error'

type Props = {
  user: IUser
}

const Home: NextPage<Props> = ({ user }) => {
  const [loading, setLoading] = useState(true)
  const [userSubs, setUserSubs] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch()
  }, [])

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const res = await StripeService.getUserSubs()
      setUserSubs(res)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/')
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && !userSubs) {
      router.push('/dashboard')
    }
  }, [loading, userSubs])

  return (
    <AuthProvider userContext={user}>
      <MainLayout className="pt-[66px] px-5">
        {loading ? (
          <div className="max-w-screen-move-fit mx-auto px-5 min-h-[calc(100vh-160px)]">Loading</div>
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
