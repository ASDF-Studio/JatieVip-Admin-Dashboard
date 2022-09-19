import { Title, Heading1 } from 'components'
import { useMediaQuery, useBreakPoint } from 'hooks'

const PhoneImage = () => {
  const isTablet = useMediaQuery(430)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/hero-2-image.webp' : '/assets/landing/hero-2-full.webp'}`}
      alt="phone front"
      className="absolute top-[149px] transform left-1/2 -translate-x-1/2 sm:translate-x-0 sm:max-w-[688px] sm:left-[40px]  max-w-full xs:max-w-[420px] ms:max-w-[430px] xl:px-0 xl:max-w-[900px] 2xl:max-w-[1000px] xl:left-[0px] xl:top-[149px]
      2xl:left-0 2xl:top-[100px] 5xl:left-[0px] 7xl:left-0 x:max-w-[900px] x:left-[67.3px]"
    />
  )
}

const GetBg = () => {
  const { isDesktop20, isDesktop40, isTablet } = useBreakPoint()

  const getBgURL = () => {
    if (isDesktop20) {
      return '/assets/landing/bg-2-1920.webp'
    }
    if (isDesktop40) {
      return '/assets/landing/bg-2-1440.webp'
    }
    if (isTablet) {
      return '/assets/landing/bg-7201.png'
    }

    return '/assets/landing/hero-2-phone.webp'
  }

  return (
    <img
      src={getBgURL()}
      alt="background"
      className="max-w-full absolute -top-[135px] -z-10 w-full sm:-top-[173px] 5xl:-top-[110px]"
    />
  )
}

export const SecondHero: React.FC = (): React.ReactElement => {
  return (
    <div className="relative flex h-[566px] ms:h-[440px] sm:h-[627px] x:h-[773px] xl:h-[755px] 2xl:h-[795px]">
      <GetBg />

      {/* <img
        src="/assets/landing/piece.png"
        alt=""
        className="max-w-[54vw] absolute top-[128vw] xs:max-w-[244px] left-[136px]"
      /> */}

      <div className="xl:max-w-[341px] 5xl:max-w-[620px] 7xl:max-w-[40vw] w-full hidden xl:flex" />
      <div className="max-w-[420px] px-5 w-full mx-auto  relative sm:max-w-[768px] sm:px-[41.5px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] xl:mx-0 2xl:max-w-[995px]">
        <div className="flex flex-col px-2.5 sm:px-0 w-full">
          <Title className="text-white/80">Why you will love Move</Title>
          <Heading1 className="text-white"> Real videos recorded </Heading1>
          <div className="relative sm:w-[360px]">
            <Heading1 className="text-white/60">
              by our <span className="text-white">💪</span> fitness coaches
            </Heading1>
          </div>
        </div>
        <PhoneImage />
      </div>
    </div>
  )
}
