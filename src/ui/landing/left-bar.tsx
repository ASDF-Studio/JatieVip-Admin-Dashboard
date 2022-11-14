import { IconButton, Typography } from '@mui/material'
import { Button, FacebookIcon, InstagramIcon, SnapChat, TikTokIcon, YoutubeIcon } from 'components'
import { useNavigate } from 'hooks/UseRouter'
import Link from 'next/link'

type Props = {
  inView: boolean
  isBlue: boolean
}

export const LeftBar: React.FC<Props> = ({ inView, isBlue }) => {
  const { navigateTo } = useNavigate()

  return (
    <div className="max-w-left-bar pt-[30px] pl-[30px] fixed flex-col hidden xl:flex z-30 overflow-y-auto h-screen  h700:justify-between ">
      <div>
        <Link href="/">
          <a>
            <img
              src={inView ? '/assets/logos/logo.svg' : '/assets/logos/move-white.svg'}
              className="max-w-[171px]"
              alt=""
            />
          </a>
        </Link>

        <div className=" flex-col gap-5 mt-[25px] hidden h700:flex">
          <div className="flex flex-col gap-2.5">
            <Link href="/">
              <a>
                <Typography
                  variant="title3"
                  className={`${inView ? 'text-black' : 'text-white'} hover:underline underline-offset-1`}
                >
                  Features
                </Typography>
              </a>
            </Link>
            <Link href="/#video">
              <a>
                <Typography
                  variant="body"
                  className={`${inView ? 'text-black/60' : 'text-white/60'} hover:underline underline-offset-1`}
                >
                  Videos
                </Typography>
              </a>
            </Link>
            <Link href="/#mwf">
              <a>
                <Typography
                  variant="body"
                  className={`${inView ? 'text-black/60' : 'text-white/60'} hover:underline underline-offset-1`}
                >
                  Move with Friends
                </Typography>
              </a>
            </Link>
            <Link href="/#habit-tracking">
              <a>
                <Typography
                  variant="body"
                  className={`${inView ? 'text-black/60' : 'text-white/60'} hover:underline underline-offset-1`}
                >
                  Habit Tracking
                </Typography>
              </a>
            </Link>
          </div>
          <Link href="/#our-vision">
            <a>
              <Typography
                variant="title3"
                className={`${inView ? 'text-black' : 'text-white'} hover:underline underline-offset-1`}
              >
                Our Vision
              </Typography>
            </a>
          </Link>
          <Link href="/#brand-story">
            <a>
              <Typography
                variant="title3"
                className={`${inView ? 'text-black' : 'text-white'} hover:underline underline-offset-1`}
              >
                Brand Story
              </Typography>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-5 mt-[25px] ">
          <Button
            className={` w-[272px] ${isBlue ? 'shadow-glassShadow' : 'shadow-buttonShadow2'}`}
            textClassName={isBlue ? 'text-primary-brand' : 'text-white'}
            variant={isBlue ? 'ghost' : 'fill'}
            onClick={() => navigateTo('/login')}
          >
            Login
          </Button>
          <Button
            className="w-[272px] shadow-glassShadow "
            variant="ghost"
            textClassName="text-primary-brand"
            onClick={() => navigateTo('/signup')}
          >
            Sign Up
          </Button>
        </div>

        <div className="flex flex-col mt-5 gap-[16px]">
          <div className={`h-[1px] w-full ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
          <div className="flex justify-between">
            <IconButton
              className="p-0"
              disableRipple
              onClick={() => {
                window.open('https://www.facebook.com/movefitapp', '_blank')
              }}
            >
              <FacebookIcon className="w-[20px] hover:opacity-80" fill={`${inView ? 'black' : 'white'}`} />
            </IconButton>
            <IconButton
              className="p-0"
              disableRipple
              onClick={() => {
                window.open('https://www.tiktok.com/@joshxkatiefit', '_blank')
              }}
            >
              <TikTokIcon className="w-[18px] hover:opacity-80" fill={`${inView ? 'black' : 'white'}`} />
            </IconButton>
            <IconButton
              className="p-0"
              disableRipple
              onClick={() => {
                window.open('https://www.snapchat.com/add/themovefitapp', '_blank')
              }}
            >
              <SnapChat className="w-[21px] hover:opacity-80" fill={`${inView ? 'black' : 'white'}`} />
            </IconButton>
            <IconButton
              className="p-0"
              disableRipple
              onClick={() => {
                window.open('https://youtube.com/channel/UCHtMq7sjroEvqdWIjFne7NA', '_blank')
              }}
            >
              <YoutubeIcon className="w-[25px] hover:opacity-80" fill={`${inView ? 'black' : 'white'}`} />
            </IconButton>

            <IconButton
              className="p-0"
              disableRipple
              onClick={() => {
                window.open('https://www.instagram.com/moveapp/', '_blank')
              }}
            >
              <InstagramIcon className="w-[20px] hover:opacity-80" fill={`${inView ? 'black' : 'white'}`} />
            </IconButton>
          </div>
          <div className={`h-[1px] w-full ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
        </div>
        <div className="flex flex-col  mt-[17px]">
          <Typography
            variant="subheadBold"
            className={`tracking-[3px] leading-[1.71] mb-[5px]  ${inView ? 'text-black' : 'text-white'}`}
          >
            DOWNLOAD
          </Typography>
          <div className="flex justify-between">
            <div className="hover:cursor-pointer w-fit">
              <img
                src="/assets/logos/google-play.png"
                alt="google play logo"
                className="max-w-[139px] h-[41px] shadow-logoShadow"
              />
            </div>
            <Link href="https://apps.apple.com/us/app/move-fitness-app/id1623388100">
              <a>
                <div className="hover:cursor-pointer w-fit">
                  <img
                    src="/assets/logos/app-store.png"
                    alt="app store logo"
                    className="max-w-[121px] h-[41px] shadow-logoShadow"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className={`h-[1px] w-full mt-5 ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
        </div>
        <div className="mt-[6px] flex flex-col leading-[32px] mb-[19px]">
          <div className="flex gap-2 items-center">
            <Link href="/terms">
              <a>
                <Typography
                  variant="body2"
                  className={`${
                    inView ? 'leading-[2] text-black' : 'leading-[2] text-white'
                  } underline-offset-1 hover:underline`}
                >
                  Terms of Service
                </Typography>
              </a>
            </Link>
            <Typography variant="body2" className={`${inView ? 'leading-[2] text-black' : 'leading-[2] text-white'}`}>
              •
            </Typography>
            <Link href="privacy-policy">
              <a>
                <Typography
                  variant="body2"
                  className={`${
                    inView ? 'leading-[2] text-black' : 'leading-[2] text-white'
                  } underline-offset-1 hover:underline`}
                >
                  Privacy Policy
                </Typography>
              </a>
            </Link>
          </div>

          <Typography variant="body2" className={`${inView ? 'leading-[2] text-black' : 'leading-[2] text-white'}`}>
            © Move, Inc. All rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  )
}
