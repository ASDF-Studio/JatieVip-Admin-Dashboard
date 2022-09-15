import { Typography } from '@mui/material'
import { Button } from 'components'

export const LeftBar = () => {
  return (
    <div className="max-w-left-bar w-full flex flex-col fixed ml-[30px] h-screen overflow-y-auto">
      <img src="/assets/logos/logo3x.webp" className="max-w-[171px]" alt="" />
      <div className="flex flex-col gap-[1.25rem] mt-[1.688rem]">
        <div className="flex flex-col gap-[5px]">
          <div className="hover:cursor-pointer">
            <Typography variant="title3">Features</Typography>
          </div>
          <div className="hover:cursor-pointer">
            <Typography variant="body" className="text-black/60">
              Videos
            </Typography>
          </div>
          <div className="hover:cursor-pointer">
            <Typography variant="body" className="text-black/60">
              Move with Friends
            </Typography>
          </div>
          <div className="hover:cursor-pointer">
            <Typography variant="body" className="text-black/60">
              Move with Friends
            </Typography>
          </div>
        </div>
        <div className="hover:cursor-pointer">
          <Typography variant="title3">Our Vision</Typography>
        </div>
        <div className="hover:cursor-pointer">
          <Typography variant="title3">Brand Story</Typography>
        </div>
      </div>
      <div className="flex flex-col gap-3.5 mt-[10.375rem]">
        <div className="h-[2px] w-full bg-black opacity-[0.15]" />
        <Typography variant="subhead" textTransform="uppercase" className="tracking-[3px] leading-[24px]">
          User Area
        </Typography>
        <div className="flex flex-col gap-5 w-full">
          <Button className="w-full" textClassName="text-white" variant="fill">
            Login
          </Button>
          <Button className="w-full" variant="fill" textClassName="text-white">
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-[1.375rem] gap-4">
        <div className="h-[2px] w-full bg-black opacity-[0.15]" />
        <div className="flex justify-between">
          <div className="hover:scale-110 hover:cursor-pointer">
            <img src="/assets/svg/facebook.svg" className="w-5 h-5" alt="facebook logo" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer">
            <img src="/assets/svg/tiktok.svg" className="w-4 h-5" alt="facebook logo" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer">
            <img src="/assets/svg/snapchat.svg" className="w-5 h-5" alt="facebook logo" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer">
            <img src="/assets/svg/youtube.svg" className="w-6 h-5" alt="facebook logo" />
          </div>
          <div className="hover:scale-110 hover:cursor-pointer">
            <img src="/assets/svg/instagram.svg" className="w-5 h-5" alt="facebook logo" />
          </div>
        </div>
        <div className="h-[2px] w-full bg-black opacity-[0.15]" />
      </div>
      <div className="flex flex-col  mt-3.5">
        <Typography variant="subheadBold1" className="tracking-[3px] leading-[24px] mb-2.5">
          DOWNLOAD
        </Typography>
        <div className="flex justify-between">
          <div className="hover:cursor-pointer">
            <img
              src="/assets/logos/google-play.png"
              alt="google play logo"
              className="max-w-[139px] h-[41px] shadow-logoShadow"
            />
          </div>
          <div className="hover:cursor-pointer">
            <img
              src="/assets/logos/app-store.png"
              alt="app store logo"
              className="max-w-[121px] h-[41px] shadow-logoShadow"
            />
          </div>
        </div>
        <div className="h-[2px] w-full bg-black opacity-[0.15] mt-3.5" />
      </div>
      <div className="mt-[1.375rem] flex flex-col leading-[32px]">
        <div className="hover:cursor-pointer">
          <Typography variant="bodyBold" className="font-bold ">
            Terms of Service
          </Typography>
        </div>
        <div className="hover:cursor-pointer">
          <Typography variant="bodyBold" className="font-bold ">
            Privacy Policy
          </Typography>
        </div>

        <Typography variant="bodyBold" className="font-bold ">
          © Move, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  )
}
