import { Typography } from '@mui/material'
import { AppleTypo, Title, Heading1 } from 'components'
import { useMediaQuery } from 'hooks'

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

const GetPhone = () => {
  const isTablet = useMediaQuery(768)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/watch-1440.webp' : '/assets/landing/group-32@3x.png'}`}
      alt="apple watch"
      className="max-w-[330px]  sm:w-[276px] x:w-[330px]  x:h-[440px] x:bottom-[140px] x:ml-[14px]  sm:h-[368px] relative sm:bottom-[22px] shrink-0"
    />
  )
}

export const Apple: React.FC = (): React.ReactElement => {
  return (
    <div
      className={`relative -top-[35px] flex bg-[url('/assets/landing/her-5-mobile-bg.webp')] sm:bg-[url('/assets/landing/apple-bg-720.webp')] x:bg-[url('/assets/landing/background-story@3x.webp')] 2xl:bg-[url('/assets/landing/bg-5-1280.webp')] bg-cover bg-no-repeat sm:-top-[40px] x:-top-[60px] pb-[66px] x:pb-[119px]`}
    >
      <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
      <div className="max-w-[420px] px-[30px] sm:px-[40px] mt-[128px] sm:mt-[128px] x:mt-[205px] 2xl:mt-[200px] w-full mx-auto relative sm:max-w-[768px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] 2xl:max-w-[995px] ">
        <div
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
          }}
          className="bg-cover sm:bg-contain bg-[url('/assets/landing/group-44@3x.webp')] sm:bg-[url('/assets/landing/gradient@3x.webp')] max-w-full min-h-[690px] sm:min-h-[347px] x:min-h-[300px] shadow-apple rounded-[18px] border-[#e9ebec] border-[1px] border-solid bg-primary-brand w-full flex-col-reverse items-center flex sm:flex-row sm:pr-[8px] sm:items-start px-5 sm:pl-0 x:pr-[39px] x:gap-[17px]"
        >
          <div className="sm:h-[346px] x:h-[300px] 2xl:ml-[30px]">
            <GetPhone />
          </div>

          <div className="flex flex-col gap-[15px] sm:gap-[17px] x:gap-[24px] mt-[32px] items-center sm:items-start">
            <div className="flex flex-col gap-2.5">
              <AppleTypo className="text-white text-center sm:text-left">Connect with Apple Health</AppleTypo>
              <Typography
                variant="desc"
                className="leading-[1.47] 2xl:max-w-[500px] tracking-[0.25px] text-[#fff]/70 font-medium text-center sm:text-start"
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
        <div id="our-vision" className="flex flex-col mt-[74px] sm:mt-[59.5px] items-center">
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
            finding new ways to push ourselves to be better each day inspired us along this journey. <br />
            <br /> Launching our fitness app is just the beginning of our overall goal of helping others become more
            health conscious, create positive life habits, and discover their full capabilities with how you Move!
          </Typography>
          <img
            className="max-w-full sm:max-w-[673px] x:max-w-[840px] mx-auto mt-[25px] x:mt-[20px]"
            src="/assets/landing/assets1.webp"
            alt="katie and josh pic"
          />
          <div
            id="brand-story"
            className="relative bg-[url('/assets/landing/group-16-copy@3x.webp')] flex flex-col bg-cover pt-[29px] pb-[34px] bottom-[40px] sm:pt-[50px] sm:pb-[42px] sm:bottom-[50px] x:bottom-[30px] "
          >
            <div className="flex flex-col  px-5 gap-5 sm:gap-[17px] sm:px-[40px] x:px-[100px] 2xl:px-[142px]">
              <Typography variant="title1" className="leading-[1.27]">
                A note from the founders
              </Typography>
              <Typography
                variant="desc"
                className="leading-[1.47] tracking-[0.25px] text-[#191b1c]/70 font-medium text-left  sm:w-[603px] x:w-[700px]"
              >
                Our mission is to help people feel confident in the way they Move. Whether you Move at home or from the
                gym we want our app to inspire you to create healthy habits, promote self confidence, and motivate you
                to hit your fitness and personal goals. No matter what your fitness level is, Move has a program for
                you.
                <br />
                <br />
                Our goal is simple – Move. Add your friends, share your progress, and tell us, how do you Move?
              </Typography>
              <img src="/assets/landing/katie-and-josh@3x.png" alt="signature" className="max-w-[272px]" />
            </div>
          </div>
        </div>
        <img
          src="/assets/landing/group-11@3x.png"
          alt=""
          className="absolute max-w-[225px] -top-[160px] left-[35vw] sm:max-w-[344px]
         sm:-top-[285px] sm:left-[375px] x:max-w-[428px] x:left-[370px] x:-top-[360px] xl:left-[310px] xl:-top-[360px] 2xl:left-[380px] 
         2xl:-top-[365px] 5xl:left-[410px]"
        />
      </div>
    </div>
  )
}
