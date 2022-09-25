import { IconButton } from '@mui/material'
import { FacebookIcon, TikTokIcon, InstagramIcon, YoutubeIcon, SnapChat } from './icons'
import { Title, Heading } from './landing'

type Props = {
  className: string
}

export const LoginSideBar = ({ className }: Props) => {
  return (
    <div
      style={{
        backgroundSize: 'cover',
        backgroundPositionX: '100%',
        backgroundRepeat: 'no-repeat',
      }}
      className={`bg-[url('/assets/images/bg@3x.webp')] min-h-screen pt-[22px] pl-[28px] relative ${className}`}
    >
      <img src="/assets/logos/move-white.svg" className="max-w-[184px]" alt="logo" />
      <div className="flex flex-col">
        <div className="flex flex-col mx-auto mt-[29px]">
          <Title className="text-white/80">Move Your Way</Title>
          <div className="relative w-full max-w-[380px] sm:max-w-[395px] xl:max-w-[538px] z-10">
            <Heading className="text-white leading-[1.29] sm:leading-[1.25] x:leading-[1.2] x:text-[40px] xl:text-[50px]">
              See amazing fitness results in 3-months
            </Heading>
            <img
              src="/assets/images/path.svg"
              className="w-[126px] absolute bottom-0 -z-10 -left-2 h-[49px] object-cover x:w-[140px] x:h-[40px] xl:w-[176px] xl:h-[49px] x:bottom-1 opacity-30"
              alt=""
            />
          </div>
          <div className="relative  xl:-top-[40px] xl:h-[600px] 5xl:h-[710px]">
            <img
              src="/assets/images/group-15@3x.webp"
              className="x:max-w-[500px] xl:max-w-[760px] 5xl:max-w-[900px]"
              alt="phone"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 x:justify-between absolute bottom-0 w-full pr-[108px] mb-[29px]">
        <div className="flex gap-[30px] xl:gap-[40px]">
          <IconButton className="p-0" disableRipple>
            <FacebookIcon className="w-[20px] xl:w-[30px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <TikTokIcon className="w-[18px] xl:w-[26px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <SnapChat className="w-[21px] xl:w-[32px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <YoutubeIcon className="w-[25px] xl:w-[38px]" fill="white" />
          </IconButton>

          <IconButton className="p-0" disableRipple>
            <InstagramIcon className="w-[20px] xl:w-[30px]" fill="white" />
          </IconButton>
        </div>
        <div className="flex gap-2.5 items-center">
          <div className="hover:cursor-pointer w-fit">
            <img
              src="/assets/logos/google-play.png"
              alt="google play logo"
              className="max-w-[149px] h-[44px] shadow-logoShadow"
            />
          </div>
          <div className="hover:cursor-pointer w-fit">
            <img
              src="/assets/logos/app-store.png"
              alt="app store logo"
              className="max-w-[133px] h-[44px] shadow-logoShadow"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
