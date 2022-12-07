import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { ManageSub } from 'ui/dashboard/'
import { AuthProvider } from 'Contexts/Auth'
import { IUser } from 'services/types'
import { useCallback, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { useRouter } from 'next/router'
import { StripeError } from 'lib/error'
import Head from 'next/head'
import { isEmpty } from 'lodash'
import { mobileSub } from 'utils/helper'

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
    if (!user.subscribed) {
      router.push('/dashboard')

      return
    }

    try {
      setLoading(true)
      const res = await StripeService.getUserSubs()
      if (!isEmpty(res)) {
        setUserSubs(res)
      } else if (user.subscribed) {
        setUserSubs({
          type: 'Mobile',
          plan: {
            interval: mobileSub[user.subscription.type].name,
            interval_count: mobileSub[user.subscription.type].interval,
          },
          status: 'active',
        })
      }
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

  return (
    <AuthProvider userContext={user}>
      <Head>
        <title>Manage Plan</title>
      </Head>
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

export { default as getServerSideProps } from 'lib/ssr'

export default Home
