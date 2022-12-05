import type { NextPage } from 'next'
import { MainLayout, Warning } from 'components'
import { CreateSub, CurrentSub } from 'ui/dashboard/'
import { ISub, IUser } from 'services/types'
import { AuthProvider } from 'Contexts/Auth'
import { useCallback, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { StripeError } from 'lib/error'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { isEmpty } from 'lodash'
import { mobileSub } from 'utils/helper'

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
      if (!isEmpty(res)) setUserSubs(res)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!userSubs && user.subscribed && !loading) {
      setUserSubs({
        type: 'Mobile',
        plan: {
          interval: mobileSub[user.subscription.type].name,
          interval_count: mobileSub[user.subscription.type].interval,
        },
        status: 'active',
      })
    }
  }, [userSubs, loading])

  return (
    <AuthProvider userContext={user}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout className="pt-[66px]">
        {loading ? (
          <div className="max-w-screen-move-fit mx-auto px-5 min-h-[calc(100vh-160px)]">Loading</div>
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

export { default as getServerSideProps } from 'lib/ssr'

export default Home
