import { NextPage } from 'next'
import { HeroSection, SecondHero, ThirdHero, ForthHero, Apple, LandingLayout, LeftBar } from 'ui/landing'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import { Reviews } from 'ui/landing/reviews'
import { Signup } from 'ui/landing/signup'
import { AdminDashBoard, CreateSub } from 'ui/dashboard'
import { MainLayout } from 'components'

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
    <div>
    {/* <LandingLayout inView={inView || inViewFooter} ref={footerRef}> */}
      {/* <Head>
        <title>Movefit</title>
      </Head>
      <LeftBar isBlue={inViewSecondHero} inView={inView || inViewFooter} />
      <HeroSection />
      <SecondHero ref={heroRef} />
      <div ref={ref}>
        <ThirdHero />
        <ForthHero />
        <Apple />
        <Reviews />
        <Signup />
      </div> */}
      <MainLayout className="pt-[66px]">
        <AdminDashBoard className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)] px-5" />
      </MainLayout>
      </div>
    // </LandingLayout>
  )
}

export default Landing
