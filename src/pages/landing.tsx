import { NextPage } from 'next'
import { Hero, Hero2, LeftBar } from 'ui/landing'

const Landing: NextPage = () => {
  return (
    <div className="flex flex-col py-[2.969rem] relative">
      <LeftBar />
      <Hero />
      <Hero2 />
    </div>
  )
}

export default Landing
