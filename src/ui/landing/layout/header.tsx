import { IconButton, Typography } from '@mui/material'
import { Button, BarIcon, FacebookIcon, TikTokIcon, SnapChat, YoutubeIcon, InstagramIcon, Xicon } from 'components'
import { useNavigate } from 'hooks/UseRouter'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const LandingHeader = ({ inView, dark }) => {
  const { navigateTo } = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // if (showMenu) {
    //   document.body.style.overflow = 'hidden'
    // } else {
    //   document.body.style.overflow = 'scroll'
    // }
  }, [showMenu])

  useEffect(() => {
    if (navigator !== undefined) {
      setIsSafari(navigator.vendor === 'Apple Computer, Inc.')
    }
  }, [])

  return (
    <div
      className={`fixed h-[60px] w-full border-b ${
        showMenu ? 'border-white/30' : inView ? 'border-[#19a3d1]/30' : 'border-white/30'
      } z-20 flex items-center justify-between pl-5 pr-[26px] xl:hidden  backdrop-blur-[22px] ${
        showMenu ? 'bg-white' : inView ? 'bg-[#64edff]/20' : ''
      }`}
    >
      <Link href="/landing">
        <a onClick={() => setShowMenu(false)}>
          <img
            src={
              showMenu ? '/assets/logos/logo.svg' : inView ? '/assets/logos/logo.svg' : '/assets/logos/move-white.svg'
            }
            alt="move logo"
            className="max-w-[122px]"
          />
        </a>
      </Link>

      <div className="flex gap-5">
        <Button variant="fill" textClassName="text-white" className="px-[30px]">
          Get Started
        </Button>

        <IconButton onClick={() => setShowMenu(!showMenu)} disableRipple className="p-0">
          {showMenu ? (
            <Xicon className="w-[24px]" />
          ) : (
            <BarIcon className="w-[22px]" fill={dark || inView ? 'black' : 'white'} />
          )}
        </IconButton>
      </div>
      <div
        style={{
          transition: '0.3s',
          opacity: showMenu ? 1 : 0,
          left: showMenu ? '0%' : '100%',
          height: 'calc(100vh - 60px)',
          minHeight: ' -webkit-fill-available',
          bottom: '0px',
          paddingBottom: isSafari && '40px',
        }}
        className="w-full fixed flex flex-col  bg-white  top-[60px]  overflow-y-auto z-50"
      >
        <div className="max-w-[420px] mx-auto w-full px-[30px] pb-[24px]">
          <div className="flex flex-col gap-5 mt-[25px] items-center">
            <div className="flex flex-col gap-2.5 items-center">
              <Link href="/landing">
                <a
                  onClick={() => {
                    setShowMenu(false)
                  }}
                >
                  <Typography variant="title3" className="text-black">
                    Features
                  </Typography>
                </a>
              </Link>
              <Link href="/landing#video">
                <a
                  onClick={() => {
                    setShowMenu(false)
                  }}
                >
                  <Typography variant="body" className="text-black/60">
                    Videos
                  </Typography>
                </a>
              </Link>

              <Link href="/landing#mwf">
                <a
                  onClick={() => {
                    setShowMenu(false)
                  }}
                >
                  <Typography variant="body" className="text-black/60">
                    Move with Friends
                  </Typography>
                </a>
              </Link>
              <Link href="/landing#habit-tracking">
                <a
                  onClick={() => {
                    setShowMenu(false)
                  }}
                >
                  <Typography variant="body" className="text-black/60">
                    Habit Tracking
                  </Typography>
                </a>
              </Link>
            </div>
            <Link href="/landing#our-vision">
              <a
                onClick={() => {
                  setShowMenu(false)
                }}
              >
                <Typography variant="title3" className="text-black">
                  Our Vision
                </Typography>
              </a>
            </Link>
            <Link href="/landing#brand-story">
              <a
                onClick={() => {
                  setShowMenu(false)
                }}
              >
                <Typography variant="title3" className="text-black">
                  Brand Story
                </Typography>
              </a>
            </Link>
          </div>

          <div className="flex flex-col gap-5 5xl:mt[220px] mt-[113px]">
            <Button
              onClick={() => navigateTo('/login')}
              className="max-w-[360px] shadow-buttonShadow2"
              textClassName="text-white"
              variant="fill"
            >
              Login
            </Button>
            <Button
              onClick={() => navigateTo('/signup')}
              className="max-w-[360px] w-full shadow-buttonShadow2"
              variant="fill"
              textClassName="text-white"
            >
              Sign Up
            </Button>
          </div>

          <div className="flex flex-col mt-5 gap-[16px]">
            <div className="h-[1px] w-full bg-black opacity-[0.15]" />
            <div className="flex justify-between">
              <IconButton
                className="p-0"
                disableRipple
                onClick={() => {
                  window.open('https://www.facebook.com/movefitapp', '_blank')
                }}
              >
                <FacebookIcon className="w-[30px]" fill="black" />
              </IconButton>
              <IconButton
                className="p-0"
                disableRipple
                onClick={() => {
                  window.open('https://www.tiktok.com/@joshxkatiefit', '_blank')
                }}
              >
                <TikTokIcon className="w-[26px]" fill="black" />
              </IconButton>
              <IconButton
                className="p-0"
                disableRipple
                onClick={() => {
                  window.open('https://www.snapchat.com/add/movefitapp', '_blank')
                }}
              >
                <SnapChat className="w-[32px]" fill="black" />
              </IconButton>
              <IconButton
                className="p-0"
                disableRipple
                onClick={() => {
                  window.open('https://youtube.com/channel/UCHtMq7sjroEvqdWIjFne7NA', '_blank')
                }}
              >
                <YoutubeIcon className="w-[38px]" fill="black" />
              </IconButton>

              <IconButton
                className="p-0"
                disableRipple
                onClick={() => {
                  window.open('https://www.instagram.com/moveapp/', '_blank')
                }}
              >
                <InstagramIcon className="w-[30px]" fill="black" />
              </IconButton>
            </div>
            <div className="h-[1px] w-full bg-black opacity-[0.15]" />
          </div>
          <div className="flex flex-col  mt-[17px]">
            <Typography
              variant="subheadBold"
              className="tracking-[3px] leading-[1.71] mb-[5px]  text-black text-center"
            >
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
            <div className="flex gap-2 justify-center items-center">
              <Link href="/landing/terms">
                <a>
                  <Typography variant="body2" className="leading-[2] text-black text-center">
                    Terms of Service
                  </Typography>
                </a>
              </Link>
              <Typography variant="body2" className="leading-[2] text-black text-center">
                •
              </Typography>
              <Link href="/landing/privacy">
                <a>
                  <Typography variant="body2" className="leading-[2] text-black text-center">
                    Privacy Policy
                  </Typography>
                </a>
              </Link>
            </div>

            <Typography variant="body2" className=" text-black leading-[2] text-center">
              © Move, Inc. All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
