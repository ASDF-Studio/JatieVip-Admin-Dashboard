import { Title, Heading1 } from 'components'
import { useMediaQuery, useBreakPoint } from 'hooks'

const PhoneImage = () => {
  const isTablet = useMediaQuery(768)

  const { isReady } = useBreakPoint()

  return (
    <img
      src={`${isReady ? (!isTablet ? '/assets/landing/hero-2-image.webp' : '/assets/landing/hero-2-full.webp') : ''}`}
      alt="phone front"
      className="mt-[28.9px] sm:mt-0 relative sm:bottom-[30px] sm:max-w-[688px] x:max-w-[900px] x:bottom-[90px] 2xl:max-w-[1000px]"
    />
  )
}

export const SecondHero: React.FC = (): React.ReactElement => {
  return (
    <div className='w-full h-[570px] sm:h-[615px] x:h-[702px] 2xl:h-[780px]'>
      <div className="relative -top-[115px] bg-[url('/assets/landing/hero-2-phone.webp')] sm:bg-[url('/assets/landing/bg-7201.png')]  sm:-top-[145px] bg-cover x:-top-[155px] x:bg-[url('/assets/landing/background-real-video@3x.webp')] bg-no-repeat flex sm:h-[761px] x:h-[858px] 2xl:h-[931px]">
        <div className="xl:max-w-[341px] 5xl:max-w-[620px] 7xl:max-w-[40vw] w-full hidden xl:flex" />
        <div className="flex-col w-full mt-[117px] sm:mt-[130px] x:mt-[140px] 2xl:mt-[145px]">
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
    </div>
  )
}
