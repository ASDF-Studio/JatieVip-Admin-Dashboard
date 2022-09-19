import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { HeroSection, SecondHero, ThirdHero, ForthHero, Apple } from 'ui/landing'

const Landing: NextPage = () => {
  return (
    <div className="flex flex-col relative">
      <div className="h-[60px] w-full hidden:xl fixed" />
      {/* <LeftBar  /> */}
      <HeroSection />
      <SecondHero />
      <ThirdHero />
      <ForthHero />
      <Apple />
      <div className="flex flex-col w-full x:px-[310px]">
        {/* <Hero />
        <Hero2 /> */}
      </div>
    </div>
  )
}

export default Landing
