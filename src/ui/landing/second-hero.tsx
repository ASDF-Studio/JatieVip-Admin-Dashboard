import { Title, Heading1 } from 'components'
import { useMediaQuery, useBreakPoint } from 'hooks'
import React from 'react'

const PhoneImage = () => {
  const isTablet = useMediaQuery(430)

  const { isReady } = useBreakPoint()

  return (
    <img
      src={`${
        isReady ? (!isTablet ? '/assets/landing/landing-section-2.webp' : '/assets/landing/hero-section-2.webp') : ''
      }`}
      alt="phone front"
      className="relative max-w-full sm:max-w-[688px] x:max-w-[900px] 2xl:max-w-[969px] bottom-[10px] sm:bottom-[50px]  x:bottom-[20px] 2xl:bottom-[40px] 5xl:bottom-[50px]"
    />
  )
}

export const SecondHero: React.FC<{ ref: any }> = React.forwardRef((props, ref): React.ReactElement => {
  return (
    <div id="video" ref={ref} className="w-full h-[650px]  sm:h-[650px] x:h-[850px] xl:h-[800px]">
      <div className="relative -top-[115px] bg-[url('/assets/landing/hero-2-phone.webp')] sm:bg-[url('/assets/landing/bg-7201.png')]  sm:-top-[145px] bg-cover x:-top-[155px] x:bg-[url('/assets/landing/background-real-video@3x.webp')] bg-no-repeat flex sm:h-[830px] x:h-[1000px] xl:h-[950px] h-[1500px]">
        <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
        <div className="flex-col items-end flex sm:px-5 w-full mx-auto relative sm:max-w-[768px] sm:pl-[41.5px] sm:pr-[39px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px]  2xl:max-w-[995px]">
          <div className="w-full ms:px-5 sm:px-0 sm:h-[530px] x:h-[680px]">
            <PhoneImage />
          </div>

          <div className="max-w-[420px] px-5 sm:px-0 relative">
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
        </div>
      </div>
    </div>
  )
})
