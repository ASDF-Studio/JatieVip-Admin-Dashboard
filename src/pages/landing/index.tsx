import { NextPage } from 'next'
import { HeroSection, SecondHero, ThirdHero, ForthHero, Apple, LandingLayout, LeftBar } from 'ui/landing'
import { useInView } from 'react-intersection-observer'

const Landing: NextPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const { ref: footerRef, inView: inViewFooter } = useInView({
    threshold: 0,
  })

  return (
    <LandingLayout inView={inView} ref={footerRef}>
      <LeftBar inView={inView || inViewFooter} />
      <HeroSection />
      <SecondHero />
      <div ref={ref}>
        <ThirdHero />
        <ForthHero />
        <Apple />
      </div>
    </LandingLayout>
  )
}

export default Landing
