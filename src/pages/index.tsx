import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { CreateSub } from 'ui/dashboard/'
import { SecurePage } from 'navigation'

const Home: NextPage = () => {
  return (
    <SecurePage>
      <MainLayout className="pt-[66px] px-5">
        <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)]" />
      </MainLayout>
    </SecurePage>
  )
}

export default Home
