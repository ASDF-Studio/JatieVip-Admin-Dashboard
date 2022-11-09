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
      className={`bg-[url('/assets/images/bg@3x.webp')] h-screen pt-[22px] pl-[28px] relative ${className}`}
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
          <div className="relative">
            <img
              src="/assets/landing/hero-2/main.webp"
              className="w40h100:max-w-[700px] w40h80:max-w-[600px] w40h70:max-w-[500px] w24h100:max-w-[700px] w24h80:max-w-[500px] w24h70:max-w-[350px] w1024h100:max-w-[450px] w1024h80:max-w-[450px] w1024h70:max-w-[400px] wmaxhmax:max-w-[800px]"
              alt="phone"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 x:justify-between absolute bottom-0 w-full pr-[108px] mb-[29px]">
        <div className="flex gap-[30px] xl:gap-[40px]">
          <IconButton
            className="p-0"
            disableRipple
            onClick={() => {
              window.open('https://www.facebook.com/movefitapp', '_blank')
            }}
          >
            <FacebookIcon className="w-[20px] xl:w-[30px] hover:opacity-80 " fill="white" />
          </IconButton>
          <IconButton
            className="p-0"
            disableRipple
            onClick={() => {
              window.open('https://www.tiktok.com/@joshxkatiefit', '_blank')
            }}
          >
            <TikTokIcon className="w-[18px] xl:w-[26px] hover:opacity-80" fill="white" />
          </IconButton>
          <IconButton
            className="p-0"
            disableRipple
            onClick={() => {
              window.open('https://www.snapchat.com/add/themovefitapp', '_blank')
            }}
          >
            <SnapChat className="w-[21px] xl:w-[32px] hover:opacity-80" fill="white" />
          </IconButton>
          <IconButton
            className="p-0"
            disableRipple
            onClick={() => {
              window.open('https://youtube.com/channel/UCHtMq7sjroEvqdWIjFne7NA', '_blank')
            }}
          >
            <YoutubeIcon className="w-[25px] xl:w-[38px] hover:opacity-80" fill="white" />
          </IconButton>

          <IconButton
            className="p-0"
            disableRipple
            onClick={() => {
              window.open('https://www.instagram.com/moveapp/', '_blank')
            }}
          >
            <InstagramIcon className="w-[20px] xl:w-[30px] hover:opacity-80" fill="white" />
          </IconButton>
        </div>
        <div className="flex gap-2.5 items-center">
          <div className="hover:cursor-pointer w-fit">
            <img src="/assets/logos/google-play.png" alt="google play logo" className="max-w-[149px] h-[44px]" />
          </div>
          <div className="hover:cursor-pointer w-fit">
            <img src="/assets/logos/app-store.png" alt="app store logo" className="max-w-[133px] h-[44px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
