import { Typography } from '@mui/material'
import { Title, Heading1, Card } from 'components'
import { useBreakPoint, useMediaQuery } from 'hooks'

const GetBg = () => {
  const { isDesktop20, isDesktop40, isTablet, isBigTablet } = useBreakPoint()

  const getBgURL = () => {
    if (isDesktop20) {
      return '/assets/landing/bg-2-1920.png'
    }
    if (isDesktop40) {
      return '/assets/landing/bg-2-1440.png'
    }
    if (isBigTablet) {
      return '/assets/landing/bg-2-1024.webp'
    }
    if (isTablet) {
      return '/assets/landing/bg-2-720.png'
    }

    return '/assets/landing/bg-2-phone.png'
  }

  return (
    <img
      src={getBgURL()}
      alt="background"
      className="max-w-full absolute -top-[60px] z-0 w-full ms:-top-[78px] xl:-top-[60px] 2xl:-top-[70px]"
    />
  )
}

const GetPhone = () => {
  const isTablet = useMediaQuery(430)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/hero-3-mobile.webp' : '/assets/landing/mobile@3x.webp'}`}
      alt=""
      className="max-w-full sm:max-w-[720px] absolute bottom-0 sm:translate-x-0 transform left-1/2 -translate-x-1/2 sm:left-[25px] x:max-w-[820px] sm:transform-none x:left-[105px] xl:left-[37px]"
    />
  )
}

export const ThirdHero: React.FC = (): React.ReactElement => {
  return (
    <div className="relative flex h-[1350px] sm:h-[862px] x:h-[901px] xl:h-[897px] 2xl:h-[910px]">
      <GetBg />

      <div className="xl:max-w-[341px] 5xl:max-w-[620px] 7xl:max-w-[40vw] w-full hidden xl:flex" />
      <div className="max-w-[420px] mt-[39px] px-5 w-full mx-auto relative sm:max-w-[768px] sm:pl-[41.5px] sm:pr-[39px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] xl:mx-0 2xl:max-w-[995px]">
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
        <div className="flex flex-wrap sm:gap-x-[43.5px] mt-[50px] sm:mt-[33px] px-2.5 sm:px-0 sm:gap-y-[17px] x:sm:gap-x-[30px] x:gap-y-[20px] x:mt-[52px] 2xl:mt-[61px]">
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
              <img src="/assets/svg/share-nodes.svg" alt="person running icon" className="w-[1.875rem] h-[1.875rem]" />
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
          <img src="/assets/landing/piece.png" alt="" className="max-w-[230px] xs:max-w-[200px] absolute -top-[80px] left-[145px] sm:max-w-[244px] sm:left-[267px] sm:-top-[110px] x:max-w-[393px] x:left-[374px] x:-top-[120px] xl:-top-[85px] 2xl:-top-[120px]" />
        </div>
        {GetPhone()}
      </div>
    </div>
  )
}
