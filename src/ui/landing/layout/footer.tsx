import { IconButton, Typography } from '@mui/material'
import { Button, FacebookIcon, InstagramIcon, TikTokIcon, TwitterIcon } from 'components'
import Link from 'next/link'

export const LandingFooter = () => {
  return (
    <div className="h-[300px]">
      <div
        className="flex flex-col relative bg-[url('/assets/landing/footer-bg@3x.webp')] bg-cover bg-no-repeat
       sm:bg-[url('/assets/landing/footer-bg-copy@3x.webp')] x:bg-[url('/assets/landing/footer-bg_1024.webp')] pt-[102px] sm:-top-[125px] -top-[100px] sm:pt-[181px] pb-[40px] x:pt-[243px] x:pb-[69px] 2xl:bg-[url('/assets/landing/footer-bg-1920.webp')]"
      >
        <div className="flex flex-col sm:gap-2.5 order-1">
          <Typography variant="titleSemiBold" className="text-white/60 text-center">
            Here’s to the next step…
          </Typography>
          <Typography variant="titleSemiBold" className="text-white text-center">
            Download our app
          </Typography>
        </div>
        <div className="flex order-2 flex-col gap-[15px] sm:flex-row sm:justify-center items-center sm:gap-2.5 sm:mt-[56px] mt-[53px] x:mt-[38px] x:gap-[47px]">
          <div className="hover:cursor-pointer w-fit mx-auto sm:mx-0">
            <img
              src="/assets/logos/google-play.png"
              alt="google play logo"
              className="max-w-[220px] sm:max-w-[247px] x:max-w-[221px] shadow-logoShadow"
            />
          </div>
          <div className="hover:cursor-pointer w-fit mx-auto sm:mx-0">
            <img
              src="/assets/logos/app-store.png"
              alt="app store logo"
              className="max-w-[220px] sm:max-w-[220px] shadow-logoShadow x:max-w-[221px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-[67px] items-center order-3 x:order-4 x:flex-row x:justify-center x:mt-[39px]">
          <Button variant="ghost" className="w-[300px] shadow-glassShadow x:w-[180px]">
            <Typography variant="bodyBold">Login</Typography>
          </Button>
          <Button variant="ghost" className="w-[300px] shadow-glassShadow x:w-[180px]">
            <Typography variant="bodyBold">Sign Up</Typography>
          </Button>
        </div>
        <div className="flex flex-col mt-[51px] gap-[15px] items-center order-4 x:order-3 x:flex-row x:justify-center x:gap-[47px] x:mt-[90px]">
          <Typography variant="title2" className="font-medium text-white leading-normal">
            Real Videos
          </Typography>
          <Typography variant="title2" className="font-medium text-white leading-normal">
            Habit Tracking
          </Typography>
          <Typography variant="title2" className="font-medium text-white leading-normal">
            Move with Friends
          </Typography>
          <Typography variant="title2" className="font-medium text-white leading-normal">
            Brand Story
          </Typography>
          <Typography variant="title2" className="font-medium text-white leading-normal">
            Our Vision
          </Typography>
        </div>
        <div className="flex gap-[30px] justify-center mt-[70px] order-5 x:mt-[38px]">
          <IconButton  className="p-0" disableRipple>
            <FacebookIcon className="w-[25px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <TikTokIcon className="w-[22px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <TwitterIcon className="w-[31px]" fill="white" />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <InstagramIcon className="w-[23px]" fill="white" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center gap-5 x:gap-0 mt-[50px] order-6 x:mt-[116px]">
          <img src="/assets/logos/move-white.svg" alt="move logo white" className="max-w-[174px]" />
          <Typography className="leading-[2] text-white x:mt-[25px]" variant="body2">
            © Move, Inc. All rights reserved.
          </Typography>
          <div className="flex items-center gap-3 x:mt-[10px]">
            <Link href="/">
              <a>
                <Typography className="leading-[2] text-white" variant="body2">
                  Terms of service
                </Typography>
              </a>
            </Link>
            <Typography className="leading-[2] text-white" variant="body2">
              •
            </Typography>
            <Link href="/">
              <a>
                <Typography className="leading-[2] text-white" variant="body2">
                  Privacy Policy
                </Typography>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
