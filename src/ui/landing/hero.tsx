import { Title, Heading, Button } from 'components'

export const HeroSection: React.FC = (): React.ReactElement => {
  return (
    <div className="relative flex h-screen sm:h-auto overflow-hidden">
      <video
        muted
        loop
        playsInline
        autoPlay
        className="absolute left-0 top-0 -z-10 w-full h-screen sm:h-[871px] object-cover scale-110 sm:scale-100"
      >
        <source src="/assets/videos/movefit-video.mp4" />
      </video>
      <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
      <div className="max-w-[420px] px-5 flex flex-col justify-end pb-[150px] sm:pb-0 sm:block w-full mx-auto mt-[92.5px] relative sm:max-w-[768px] sm:px-[41.5px] sm:mt-[81px] x:max-w-[1024px] x:px-[61.3px] x:mt-[81px] xl:px-0 xl:max-w-[900px] xl:mt-[80.5px] 2xl:max-w-[995px]  sm:min-h-[726px] xl:min-h-[718px] 2xl:min-h-[840px] overflow-hidden ">
        <img
          src="/assets/images/landing/phone.webp"
          className="hidden sm:block absolute max-w-[420px] left-1/2 -translate-x-1/2 transform sm:translate-x-0 top-[258px] sm:max-w-[515px] sm:top-0 sm:-left-[82px] x:-left-[12px] xl:-left-[74px]
           2xl:max-w-[602px] 2xl:-left-[118px] z-10"
          alt="phone"
        />

        <div className="flex flex-col gap-[24.5px] sm:gap-[28px] xl:gap-4 mt-0 sm:mt-[220px] sm:ml-[291px] x:ml-[382px] x:mt-[241px] xl:ml-[382px] xl:mt-[233px] sm:mb-0">
          <div className="flex flex-col">
            <Title className="text-white/80">Move Your Way</Title>
            <div className="relative w-full max-w-[380px] sm:max-w-[395px] x:max-w-[538px]">
              <Heading className="text-white leading-[1.29] sm:leading-[1.25] x:leading-[1.2]">
                See amazing fitness results in 3-months
              </Heading>
              <img
                src="/assets/landing/path.svg"
                className="w-[126px] absolute bottom-0 -z-10 -left-2 h-[49px] object-cover sm:w-[176px] sm:h-[50px] sm:-bottom-1 x:w-[176px] x:h-[49px] x:bottom-1"
                alt=""
              />
            </div>
          </div>

          <div className="flex gap-2.5 flex-col sm:flex-row gap-y-[17px]">
            <Button
              variant="landingButton"
              className="bg-primary-brand max-w-[185px] w-full sm:max-w-[180px] xl:max-w-[200px]"
              textClassName="text-white"
            >
              Get Started
            </Button>
            <Button
              variant="landingButton"
              className="bg-white max-w-[185px] w-full sm:max-w-[180px] xl:max-w-[200px]"
              textClassName="text-primary-brand"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
