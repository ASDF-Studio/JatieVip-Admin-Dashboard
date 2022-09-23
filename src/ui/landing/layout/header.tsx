import { IconButton, Typography } from '@mui/material'
import { Button, BarIcon, FacebookIcon, TikTokIcon, SnapChat, YoutubeIcon, InstagramIcon, Xicon } from 'components'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const LandingHeader = ({ inView }) => {
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [showMenu])

  return (
    <div
      className={`fixed h-[60px] w-full border-b border-white/30 z-20 flex items-center justify-between pl-5 pr-[26px] xl:hidden  backdrop-blur-[22px] ${
        showMenu && 'bg-white'
      }`}
    >
      <Link href="/">
        <a>
          <img src="/assets/logos/logo.svg" alt="move logo" className="max-w-[122px]" />
        </a>
      </Link>

      <div className="flex gap-5">
        {!showMenu && (
          <Button variant="fill" textClassName="text-white" className="px-[30px]">
            Get Started
          </Button>
        )}
        <IconButton onClick={() => setShowMenu(!showMenu)} disableRipple className="p-0">
          {showMenu ? <Xicon className="w-[24px]" /> : <BarIcon className="w-[22px]" fill="white" />}
        </IconButton>
      </div>
      <div
        style={{
          transition: '0.3s',
          opacity: showMenu ? 1 : 0,
          left: showMenu ? '0%' : '100%',
          height: 'calc(100vh - 60px)',
        }}
        className="w-full fixed flex flex-col  bg-white  top-[60px]  overflow-y-auto"
      >
        <div className="max-w-[420px] mx-auto w-full px-[30px] pb-[24px]">
          <div className="flex flex-col gap-5 mt-[25px] items-center">
            <div className="flex flex-col gap-2.5 items-center">
              <div className="hover:cursor-pointer w-fit">
                <Typography variant="title3" className="text-black">
                  Features
                </Typography>
              </div>
              <div className="hover:cursor-pointer w-fit">
                <Typography variant="body" className="text-black/60">
                  Videos
                </Typography>
              </div>
              <div className="hover:cursor-pointer w-fit">
                <Typography variant="body" className="text-black/60">
                  Move with Friends
                </Typography>
              </div>
              <div className="hover:cursor-pointer w-fit">
                <Typography variant="body" className="text-black/60">
                  Habit Tracking
                </Typography>
              </div>
            </div>
            <div className="hover:cursor-pointer w-fit">
              <Typography variant="title3" className="text-black">
                Our Vision
              </Typography>
            </div>
            <div className="hover:cursor-pointer w-fit">
              <Typography variant="title3" className="text-black">
                Brand Story
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-5 5xl:mt[220px] mt-[113px]">
            <Button className="max-w-[360px] shadow-buttonShadow2" textClassName="text-white" variant="fill">
              Login
            </Button>
            <Button className="max-w-[360px] w-full shadow-buttonShadow2" variant="fill" textClassName="text-white">
              Sign Up
            </Button>
          </div>

          <div className="flex flex-col mt-5 gap-[16px]">
            <div className="h-[1px] w-full bg-black opacity-[0.15]" />
            <div className="flex justify-between">
              <IconButton className="p-0" disableRipple>
                <FacebookIcon className="w-[30px]" fill="black" />
              </IconButton>
              <IconButton className="p-0" disableRipple>
                <TikTokIcon className="w-[26px]" fill="black" />
              </IconButton>
              <IconButton className="p-0" disableRipple>
                <SnapChat className="w-[32px]" fill="black" />
              </IconButton>
              <IconButton className="p-0" disableRipple>
                <YoutubeIcon className="w-[38px]" fill="black" />
              </IconButton>

              <IconButton className="p-0" disableRipple>
                <InstagramIcon className="w-[30px]" fill="black" />
              </IconButton>
            </div>
            <div className="h-[1px] w-full bg-black opacity-[0.15]" />
          </div>
          <div className="flex flex-col  mt-[17px]">
            <Typography variant="subheadBold" className="tracking-[3px] leading-[1.71] mb-[5px] text-white">
              DOWNLOAD
            </Typography>
            <div className="flex justify-between">
              <div className="hover:cursor-pointer">
                <img
                  src="/assets/logos/google-play.png"
                  alt="google play logo"
                  className="max-w-[177px] h-[52px] shadow-logoShadow"
                />
              </div>
              <div className="hover:cursor-pointer">
                <img
                  src="/assets/logos/app-store.png"
                  alt="app store logo"
                  className="max-w-[157px] h-[52px] shadow-logoShadow"
                />
              </div>
            </div>
            <div className="h-[1px] w-full bg-black opacity-[0.15] mt-5" />
          </div>
          <div className="mt-[30px] flex flex-col leading-[32px]">
            <Link href="/">
              <a>
                <Typography variant="body2" className="leading-[2] text-black text-center">
                  Terms of Service • Privacy Policy
                </Typography>
              </a>
            </Link>

            <Typography variant="body2" className=" text-black leading-[2] text-center">
              © Move, Inc. All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
