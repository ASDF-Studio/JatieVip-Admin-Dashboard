import { NextPage } from 'next'
import { AdminDashBoard } from 'ui/dashboard'
import { MainLayout } from 'components'

const Landing: NextPage = () => {
  return (
    <MainLayout className="pt-[66px]">
      <AdminDashBoard className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)] px-5" />
    </MainLayout>
  )
}

export default Landing
