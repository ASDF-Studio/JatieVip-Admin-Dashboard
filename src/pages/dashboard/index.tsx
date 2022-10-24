import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout, Warning } from 'components'
import { CreateSub, CurrentSub } from 'ui/dashboard/'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { ISub, IUser } from 'services/types'
import { AuthProvider } from 'Contexts/Auth'
import { useCallback, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { StripeError } from 'lib/error'
import { useRouter } from 'next/router'

type Props = {
  user: IUser
}

const Home: NextPage = ({ user }: Props) => {
  const [loading, setLoading] = useState(false)
  const [userSubs, setUserSubs] = useState<ISub>(null)
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

  return (
    <AuthProvider userContext={user}>
      <MainLayout className="pt-[66px]">
        {loading ? (
          <div className="px-5 min-h-[calc(100vh-160px)]">Loading</div>
        ) : (
          <div>
            {userSubs?.status === 'past_due' && <Warning paymentUrl={userSubs?.latest_invoice.hosted_invoice_url} />}
            {userSubs ? (
              <CurrentSub
                subs={userSubs}
                className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] sm:mt-[53px] min-h-[calc(100vh-209px)] px-5"
              />
            ) : (
              <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)] px-5" />
            )}
          </div>
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
