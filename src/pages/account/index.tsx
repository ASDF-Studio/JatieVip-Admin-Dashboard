import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { AuthProvider } from 'Contexts/Auth'
import { IUser } from 'services/types'
import { Profile } from 'ui/account'
import Head from 'next/head'

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <MainLayout className="pt-[66px] px-5">
        <Profile />
      </MainLayout>
    </>
  )
}

export default Account
