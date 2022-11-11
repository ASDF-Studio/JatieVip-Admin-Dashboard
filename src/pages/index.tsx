import { NextPage } from 'next'
import { HeroSection, SecondHero, ThirdHero, ForthHero, Apple, LandingLayout, LeftBar } from 'ui/landing'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'

const Landing: NextPage = () => {
  const { ref, inView } = useInView({
    threshold: [0.1],
  })
  const { ref: footerRef, inView: inViewFooter } = useInView({
    threshold: 0,
  })

  const { ref: heroRef, inView: inViewSecondHero } = useInView({
    threshold: [0.3],
  })

  return (
    <LandingLayout inView={inView || inViewFooter} ref={footerRef}>
      <Head>
        <title>Movefit</title>
      </Head>
      <LeftBar isBlue={inViewSecondHero} inView={inView || inViewFooter} />
      <HeroSection />
      <SecondHero ref={heroRef} />
      <div ref={ref}>
        <ThirdHero />
        <ForthHero />
        <Apple />
      </div>
    </LandingLayout>
  )
}

export default Landing
