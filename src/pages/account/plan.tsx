import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { ManageSub } from 'ui/dashboard/'

const Home: NextPage = () => {
  return (
    <MainLayout className="pt-[66px]">
      <ManageSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[3.375rem] mb-[3.094rem]" />
    </MainLayout>
  )
}

export default Home
