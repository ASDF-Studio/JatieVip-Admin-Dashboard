import { NextPage } from 'next'
import { HeroSection, SecondHero, ThirdHero, ForthHero, Apple, LandingLayout } from 'ui/landing'

const Landing: NextPage = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <SecondHero />
      <ThirdHero />
      <ForthHero />
      <Apple />
    </LandingLayout>
  )
}

export default Landing
