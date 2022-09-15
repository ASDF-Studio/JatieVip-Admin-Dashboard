import { NextPage } from 'next'
import { Hero, Hero2, LeftBar } from 'ui/landing'

const Landing: NextPage = () => {
  return (
    <div className="flex flex-col py-[2.969rem] relative">
      <LeftBar />
      <div className="flex flex-col w-full px-[310px]">
        <Hero />
        <Hero2 />
      </div>
    </div>
  )
}

export default Landing
