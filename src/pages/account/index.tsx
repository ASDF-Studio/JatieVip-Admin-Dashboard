import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { ManageSub } from 'ui/dashboard/'

const Home: NextPage = () => {
  return (
    <MainLayout className="pt-[66px]">
      <div>HEllo Profile</div>
    </MainLayout>
  )
}

export default Home
