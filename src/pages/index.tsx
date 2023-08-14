import { NextPage } from 'next'
import { AdminDashBoard } from 'ui/dashboard'
import { MainLayout } from 'components'
import { useAuth } from 'Contexts/Auth'
import Head from 'next/head'

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>JatieVip Dashboard</title>
      </Head>
      <MainLayout className="pt-[66px]">
        <AdminDashBoard className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)] px-5" />
      </MainLayout>
    </>
  )
}

export default Landing
