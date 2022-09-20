import { Title, Heading1 } from 'components'
import { useMediaQuery, useBreakPoint } from 'hooks'

const PhoneImage = () => {
  const isTablet = useMediaQuery(768)

  return (
    <img
      src={`${!isTablet ? '/assets/landing/hero-2-image.webp' : '/assets/landing/hero-2-full.webp'}`}
      alt="phone front"
      className="mt-[28.9px] sm:mt-0 relative sm:bottom-[30px] sm:max-w-[688px] x:max-w-[900px] x:bottom-[90px] 2xl:max-w-[1000px]"
    />
  )
}

const GetBg = () => {
  const { isDesktop20, isDesktop40, isTablet, isReady, isBigTablet, isDesktop } = useBreakPoint()

  const getBgURL = () => {
    if (!isReady) {
      return ''
    }
    if (isDesktop20) {
      return '/assets/landing/bg-2-1920.webp'
    }
    if (isDesktop40) {
      return '/assets/landing/bg-2-1440.webp'
    }
    if (isDesktop) {
      return '/assets/landing/background-real-video@3x.webp'
      
    }
    if (isBigTablet) {
      return '/assets/landing/background-real-video@3x.webp'
    }
    if (isTablet) {
      return '/assets/landing/bg-7201.png'
    }

    return '/assets/landing/hero-2-phone.webp'
  }

  return (
    <img
      src={getBgURL()}
      alt=""
      className="max-w-full absolute -top-[115px] -z-10 w-full sm:-top-[145px] xl:-top-[160px] 2xl:-top-[275px] 5xl:-top-[110px]"
    />
  )
}

export const SecondHero: React.FC = (): React.ReactElement => {
  return (
    <div className="relative flex sm:h-[630px] x:h-[718px] 2xl:h-[810px]">
      <GetBg />
      <div className="xl:max-w-[341px] 5xl:max-w-[620px] 7xl:max-w-[40vw] w-full hidden xl:flex" />
      <div className="flex-col w-full">
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
        </div>
        <div className="w-full sm:mx-auto sm:max-w-[768px] sm:px-[41.5px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px] xl:mx-0 2xl:max-w-[995px]">
          <PhoneImage />
        </div>
      </div>
    </div>
  )
}
