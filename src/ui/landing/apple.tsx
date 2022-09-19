import { Typography } from '@mui/material'
import { AppleTypo, Title, Heading1 } from 'components'
import { useBreakPoint, useMediaQuery } from 'hooks'

const Tag = ({ text, icon }) => {
  return (
    <div className="flex px-[23px] rounded-[21px] bg-[#63eeff]/30  h-[42px] items-center justify-center gap-[10.9px]">
      <img src={icon} className="w-[13px] h-[13px]" alt="svg" />
      <Typography textTransform="capitalize" className="font-semibold text-white" fontSize="12.6px">
        {text}
      </Typography>
    </div>
  )
}

const GetBg = () => {
  const { isDesktop20, isDesktop40, isTablet, isBigTablet } = useBreakPoint()

  const getBgURL = () => {
    if (isDesktop20) {
      return '/assets/landing/bg-5-1280.webp'
    }
    if (isDesktop40) {
      return '/assets/landing/bg-5-1280.webp'
    }
    if (isBigTablet) {
      return '/assets/landing/bg-5-1280.webp'
    }
    if (isTablet) {
      return '/assets/landing/apple-bg-720.webp'
    }

    return '/assets/landing/her-5-mobile-bg.webp'
  }

  return (
    <img
      src={getBgURL()}
      alt="background"
      className="max-w-full absolute -top-[35px] z-0 w-full ms:-top-[35px] sm:-top-[40px] x:-top-[60px] xl:-top-[60px] 2xl:-top-[60px]"
    />
  )
}

const GetPhone = () => {
  const isTablet = useMediaQuery(768)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/watch-1440.webp' : '/assets/landing/group-32@3x.png'}`}
      alt="apple watch"
      className="max-w-[330px] sm:w-[276px] x:w-[330px]  x:h-[440px] x:bottom-[95px] x:ml-[14px]  sm:h-[368px] relative sm:bottom-[22px] shrink-0"
    />
  )
}

export const Apple: React.FC = (): React.ReactElement => {
  return (
    <div className="relative flex bg-white">
      <GetBg />

      <div className="xl:max-w-[341px] 5xl:max-w-[620px] 7xl:max-w-[40vw] w-full hidden xl:flex" />
      <div className="max-w-[420px] px-[30px] sm:px-[40px] mt-[128px] sm:mt-[128px] x:mt-[75px] 2xl:mt-[165px] w-full mx-auto relative sm:max-w-[768px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] xl:mx-0 2xl:max-w-[995px] ">
        <div className="max-w-full h-[690px] sm:h-[347px] shadow-apple rounded-[18px] border-[#e9ebec] border-[1px] border-solid bg-primary-brand w-full flex-col-reverse items-center flex sm:flex-row sm:pr-[8px] sm:items-start px-5 sm:pl-0 x:pr-[39px] x:gap-[17px]">
          <GetPhone />
          <div className="flex flex-col gap-[15px] sm:gap-[17px] x:gap-[24px] mt-[32px] items-center sm:items-start">
            <div className="flex flex-col gap-2.5">
              <AppleTypo className="text-white text-center sm:text-left">Connect with Apple Health</AppleTypo>
              <Typography
                variant="desc"
                className="leading-[1.47] tracking-[0.25px] text-[#fff]/70 font-medium text-center sm:text-start"
              >
                Health is the health informatics mobile app announced on June 2, 2014 by Apple Inc. at its Worldwide
                Developers Conference.
              </Typography>
            </div>
            <div className="flex flex-col gap-[15px] sm:gap-[18px] x:gap-[21px] items-center sm:items-start mb-[23px] sm:mb-0">
              <div className="flex px-[36px]  sm:px-0 flex-wrap gap-x-[11px] gap-y-[15px] sm:gap-y-2.5 justify-center sm:justify-start">
                <Tag text="Sleep" icon="/assets/svg/bed-front.svg" />
                <Tag text="Heart Rate" icon="/assets/svg/heart.svg" />
                <Tag text="Walk" icon="/assets/svg/person-walking.svg" />
                <Tag text="Steps" icon="/assets/svg/shoe-prints.svg" />
              </div>
              <img
                src="/assets/landing/apple-health-badge-us-uk-blk-s-rgb@3x.png"
                className="w-[216px]"
                alt="apple healt badge"
              />
            </div>
          </div>
        </div>
        {/* <img src="/assets/landing/group-9@3x.png" alt="" className="max-w-[248px] -top-[135px] left-[125px] sm:max-w-[355px] sm:-top-[215px] sm:left-[285px] absolute ms:-top-[130px] ms:left-[135px] x:-top-[205px] x:left-[415px]  xl:left-[285px] 2xl:left-[345px] 5xl:left-[375px]" /> */}
        <div className="flex flex-col mt-[74px] sm:mt-[59.5px] items-center">
          <div className="flex flex-col gap-2.5 sm:gap-0">
            <Title className="text-[#191b1c]/60 text-center">Why We Move</Title>
            <Heading1 className="text-[#191b1c] text-center">
              <span className="text-[#86949f]">The story of</span> <br /> Katie and Josh
            </Heading1>
          </div>
          <Typography
            variant="desc"
            className="leading-[1.47] tracking-[0.25px] text-[#191b1c]/70 font-medium text-center mt-[20px]  sm:mt-[12px] sm:w-[650px] x:w-[800px]"
          >
            The idea for Move started when a young Katie and Josh met at a boxing gym. The love for fitness, health, and
            finding new ways to push ourselves to be better each day inspired us along this journey. <br /><br /> Launching
            our fitness app is just the beginning of our overall goal of helping others become more health conscious,
            create positive life habits, and discover their full capabilities with how you Move!
          </Typography>
        </div>
      </div>
    </div>
  )
}
