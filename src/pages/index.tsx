import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { CreateSub } from 'ui/dashboard/'

const Home: NextPage = () => {
  return (
    <MainLayout className="pt-[66px] px-5">
      <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)]" />
    </MainLayout>
  )
}

export default Home
