import { Typography } from '@mui/material'
import { Title, Heading1, Card } from 'components'
import { useBreakPoint, useMediaQuery } from 'hooks'

const GetBg = () => {
  const { isDesktop20, isDesktop40, isTablet, isBigTablet } = useBreakPoint()

  const getBgURL = () => {
    if (isDesktop20) {
      return '/assets/landing/bg-4-720.svg'
    }
    if (isDesktop40) {
      return '/assets/landing/bg-4-720.svg'
    }
    if (isBigTablet) {
      return '/assets/landing/group-16@3x.png'
    }
    if (isTablet) {
      return '/assets/landing/bg-4-720.svg'
    }

    return '/assets/landing/hero-4-420.png'
  }

  return (
    <img
      src={getBgURL()}
      alt="background"
      className="max-w-full absolute -top-[57px] z-0 w-full ms:-top-[35px] sm:-top-[30px] x:-top-[35px] xl:-top-[25px] 2xl:-top-[30px]"
    />
  )
}

const GetPhone = () => {
  const isTablet = useMediaQuery(768)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/hero-4/main-phone.webp' : '/assets/landing/hero-4/main.webp'}`}
      alt=""
      className="max-w-full w-full relative mt-[30px] sm:mt-0 x:mt-[14px] x:bottom-0 sm:bottom-2.5"
    />
  )
}

export const Reviews: React.FC = (): React.ReactElement => {
  return (
    <div id="habit-tracking" className="relative flex bg-white">
      <GetBg />

      <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
      <div className="max-w-[420px] mt-[52px] sm:mt-[115px] x:mt-[84px] w-full mx-auto relative sm:max-w-[768px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px]  2xl:max-w-[995px] ">
        <div className="flex flex-col px-[30px] sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 w-full x:mx-auto">
          <div className="flex flex-col gap-[2px]">
            <Title className="text-center sm:text-left text-[#191b1c]/60">Customer Reviews</Title>
            <Heading1 className="text-center sm:text-left text-[#191b1c] sm:max-w-[515px]">
              <span className="text-[#86949F]">Don’t just take our words </span>
              Our users ❤️ love us
            </Heading1>
          </div>
          {/* <Typography
            variant="body3"
            className="text-center sm:text-left mt-[9px] sm:mt-[23px] x:mt-[19px] sm:max-w-[624px]"
          >
            Our Habit Tracker feature - designed to assist you in building and maintaining healthy habits to keep your
            goals the top priority.
          </Typography> */}
        </div>
        <div className="flex  flex-wrap sm:gap-x-[43.5px] x:gap-x-[30px] 2xl:gap-x-[75px] mt-[45.5px] sm:mt-[40px] px-[30px] sm:px-0 sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 gap-y-[30px] x:mt-[72px] 2xl:mt-[61px]">
          {/* <Card
            className="order-1"
            icon={<img src="/assets/svg/bell-on.svg" alt="person running icon" className="w-[1.875rem] h-[1.875rem]" />}
            title="Create Personalized Habits"
            desc="Keep yourself accountable by adding daily reminders to your tracker."
          /> */}
          <img
            src="/assets/landing/customer-rev-@3x.webp"
            alt=""
            // className="max-w-[248px] -top-[135px] left-[125px] sm:max-w-[355px] sm:-top-[215px] sm:left-[285px] absolute ms:-top-[130px] ms:left-[135px] x:-top-[205px] x:left-[415px]  xl:left-[285px] 2xl:left-[345px] 5xl:left-[390px]"
            className="max-w-[380px] max-h-[274px]"
          />
          <Card
            className="order-2 left-[20px]"
            icon={
              <img src="/assets/svg/badge-check.svg" alt="person running icon" className="w-[1.875rem] h-[1.875rem]" />
            }
            title="  I just love the Move App"
            desc="Gamify your life with winnable virtual badges to remind yourself of your accomplishments"
          />
          <Card
            className="order-3"
            icon={
              <img src="/assets/svg/gauge-high.svg" alt="person running icon" className="w-[1.875rem] h-[1.875rem]" />
            }
            title="Habit Streak"
            desc="See how long you can keep the streak by hitting your goals and checking them off daily"
          />
        </div>
        <img
          src="/assets/landing/hero-3/side.webp"
          alt=""
          className="max-w-[248px] -top-[135px] left-[125px] sm:max-w-[355px] sm:-top-[215px] sm:left-[285px] absolute ms:-top-[130px] ms:left-[135px] x:-top-[205px] x:left-[415px]  xl:left-[285px] 2xl:left-[345px] 5xl:left-[390px]"
        />
        {GetPhone()}
      </div>
    </div>
  )
}
