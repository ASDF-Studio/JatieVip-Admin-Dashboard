import { Typography } from '@mui/material'
import { Title, Heading1, Card } from 'components'
import { useBreakPoint, useMediaQuery } from 'hooks'
import React from 'react'

const GetPhone = () => {
  const { isBigTablet } = useBreakPoint()
  const isTablet = useMediaQuery(430)

  const getUrl = () => {
    if (isBigTablet) {
      return '/assets/landing/mobile@3x.webp'
    }
    if (isTablet) {
      return '/assets/landing/mobile@3x.webp'
    }

    return '/assets/landing/hero-3-mobile.webp'
  }

  return (
    <img
      src={getUrl()}
      alt=""
      className="max-w-full mt-5 sm:mt-0 sm:bottom-[75px] relative sm:max-w-[720px] x:max-w-[820px] sm:mx-auto x:bottom-[135px] 2xl:ml-[43px] 2xl:bottom-[130px]"
    />
  )
}

export const ThirdHero = React.forwardRef((props, ref) => {
  return (
    <div id="mwf" ref={ref} className="w-full sm:h-[855px] x:h-[936px]  xl:h-[927px] 2xl:h-[927px]">
      <div className="relative bg-[url('/assets/landing/bg-2-phone.png')] sm:bg-[url('/assets/landing/bg-2-720.png')] -top-[22px] sm:-top-[75px] x:-top-[55px] xl:-top-[65px] 2xl:-top-[70px]  x:bg-[url('/assets/landing/bg-2-1024.webp')] 2xl:bg-[url('/assets/landing/bg-2-1440.png')] 5xl:bg-[url('/assets/landing/bg-2-1920.png')]  flex sm:h-[931px] x:h-[992px] xl:h-[993px] 2xl:h-[995px] bg-no-repeat bg-cover">
        {/* <GetBg /> */}

        <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
        <div className="flex-col w-full">
          <div className="max-w-[420px] mt-[70px] sm:mt-[105px] x:mt-[133px] 2xl:mt-[124px] px-5 w-full mx-auto relative sm:max-w-[768px] sm:pl-[41.5px] sm:pr-[39px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px]  2xl:max-w-[995px]">
            <div className="flex flex-col px-2.5 sm:px-0 w-full x:max-w-[710px] x:mx-auto">
              <div className="flex flex-col gap-[2px] sm:gap-[4px]">
                <Title className="text-center text-[#191b1c]/60">Why you will love Move</Title>
                <Heading1 className="text-center text-[#191b1c]">
                  Move 👊 with <span className="text-[#86949F]">Friends</span>
                </Heading1>
              </div>
              <Typography variant="body3" className="text-center mt-[9px] sm:mt-[23px]">
                Move with friends - allows you to add and connect with friends, follow along with their workouts and
                progress, and share how you Move with others.
              </Typography>
            </div>
            <div className="flex flex-wrap sm:gap-x-[43.5px] mt-[50px] sm:mt-[33px] px-2.5 sm:px-0 sm:gap-y-[17px] x:gap-x-[30px]  2xl:gap-x-[75px] x:gap-y-[20px] x:mt-[52px] 2xl:mt-[61px]">
              <Card
                className="order-1 sm:order-1"
                icon={
                  <img
                    src="/assets/svg/person-running.svg"
                    alt="person running icon"
                    className="w-[1.875rem] h-[1.875rem]"
                  />
                }
                title="Workout with Friends"
                desc="Send and receive messages to hype up your friends when they finish a workout."
              />
              <Card
                className="order-5 sm:order-2"
                icon={
                  <img
                    src="/assets/svg/group-arrows-rotate.svg"
                    alt="person running icon"
                    className="w-[1.875rem] h-[1.875rem]"
                  />
                }
                title="Build a Community "
                desc="Follow your friends and others who inspire you! See their progress and follow along with their workouts."
              />
              <Card
                className="order-3 sm:order-3"
                icon={
                  <img
                    src="/assets/svg/share-nodes.svg"
                    alt="person running icon"
                    className="w-[1.875rem] h-[1.875rem]"
                  />
                }
                title="Share Your Progress"
                desc="Post pictures on your profile to track your fitness journey and inspire others."
              />
              <img
                src="/assets/landing/left-hero-3.png"
                alt=""
                className="mt-[22px] mb-[30px] order-2 max-w-[280px] sm:max-w-[200px] mx-auto sm:mx-0 sm:order-4 sm:mb-0 sm:mt-0 x:max-w-[280px]"
              />
              <div className="max-w-[200px] w-full hidden sm:flex sm:order-5 x:max-w-[280px]" />
              <img
                src="/assets/landing/right-hero-3.png"
                alt=""
                className="max-w-[280px] sm:max-w-[200px] order-4  mx-auto sm:mx-0 mt-[20px] mb-[39px] sm:order-6 sm:mb-0 sm:mt-0 x:max-w-[280px]"
              />
              {/* <img
                src="/assets/landing/piece.png"
                alt=""
                className="max-w-[230px] xs:max-w-[260px] absolute -top-[80px] left-[34vw] sm:max-w-[278px] sm:left-[300px] sm:-top-[105px] x:max-w-[393px] x:left-[400px] x:-top-[135px] xl:left-[330px] 2xl:-top-[130px] 2xl:left-[400px] "
              /> */}
            </div>
          </div>
          <div className="w-full mx-auto sm:px-[20px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] 2xl:max-w-[995px]">
            {GetPhone()}
          </div>
        </div>
      </div>
    </div>
  )
})
