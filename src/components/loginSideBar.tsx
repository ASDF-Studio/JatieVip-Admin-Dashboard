import { IconButton } from '@mui/material'
import Link from 'next/link'
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
      className={`bg-[url('/assets/landing/login/login.webp')] h-screen pt-[22px] pl-[28px] relative ${className}`}
    >
      <img src="/assets/logos/jatieVIP.svg" className="max-w-[142px]" alt="logo" />
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
          <Link href="https://play.google.com/store/apps/details?id=com.movefitness.app">
            <a>
              <div className="hover:cursor-pointer w-fit">
                <img src="/assets/logos/google-play.png" alt="google play logo" className="max-w-[149px] h-[44px]" />
              </div>
            </a>
          </Link>
          <Link href="https://apps.apple.com/us/app/move-fitness-app/id1623388100">
            <a>
              <div className="hover:cursor-pointer w-fit">
                <img src="/assets/logos/app-store.png" alt="app store logo" className="max-w-[133px] h-[44px]" />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
