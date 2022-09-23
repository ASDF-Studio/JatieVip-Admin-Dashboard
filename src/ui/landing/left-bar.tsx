import { IconButton, Typography } from '@mui/material'
import { Button, FacebookIcon, InstagramIcon, SnapChat, TikTokIcon, YoutubeIcon } from 'components'
import Link from 'next/link'

type Props = {
  inView: boolean
}

export const LeftBar: React.FC<Props> = ({ inView }) => {
  return (
    <div className="max-w-left-bar pt-[30px] pl-[30px] fixed  flex-col overflow-y-auto hidden xl:flex z-30 ">
      <img src={inView ? "/assets/logos/logo.svg" : "/assets/logos/move-white.svg"} className="max-w-[171px]" alt="" />
      <div className="flex flex-col gap-5 mt-[25px]">
        <div className="flex flex-col gap-2.5">
          <div className="hover:cursor-pointer  w-fit">
            <Typography variant="title3" className={`${inView ? 'text-black' : 'text-white'}`}>
              Features
            </Typography>
          </div>
          <div className="hover:cursor-pointer w-fit">
            <Typography variant="body" className={`${inView ? 'text-black/60' : 'text-white/60'}`}>
              Videos
            </Typography>
          </div>
          <div className="hover:cursor-pointer w-fit">
            <Typography variant="body" className={`${inView ? 'text-black/60' : 'text-white/60'}`}>
              Move with Friends
            </Typography>
          </div>
          <div className="hover:cursor-pointer w-fit">
            <Typography variant="body" className={`${inView ? 'text-black/60' : 'text-white/60'}`}>
              Move with Friends
            </Typography>
          </div>
        </div>
        <div className="hover:cursor-pointer w-fit">
          <Typography variant="title3" className={`${inView ? 'text-black' : 'text-white'}`}>
            Our Vision
          </Typography>
        </div>
        <div className="hover:cursor-pointer w-fit">
          <Typography variant="title3" className={`${inView ? 'text-black' : 'text-white'}`}>
            Brand Story
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-5 5xl:mt[220px] mt-[113px]">
        <Button className="w-[272px] shadow-buttonShadow2" textClassName="text-white" variant="fill">
          Login
        </Button>
        <Button className="w-[272px] shadow-buttonShadow2" variant="fill" textClassName="text-white">
          Sign Up
        </Button>
      </div>

      <div className="flex flex-col mt-5 gap-[16px]">
        <div className={`h-[1px] w-full ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
        <div className="flex justify-between">
          <IconButton className="p-0" disableRipple>
            <FacebookIcon className="w-[20px]" fill={`${inView ? 'black' : 'white'}`} />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <TikTokIcon className="w-[18px]" fill={`${inView ? 'black' : 'white'}`} />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <SnapChat className="w-[21px]" fill={`${inView ? 'black' : 'white'}`} />
          </IconButton>
          <IconButton className="p-0" disableRipple>
            <YoutubeIcon className="w-[25px]" fill={`${inView ? 'black' : 'white'}`} />
          </IconButton>

          <IconButton className="p-0" disableRipple>
            <InstagramIcon className="w-[20px]" fill={`${inView ? 'black' : 'white'}`} />
          </IconButton>
        </div>
        <div className={`h-[1px] w-full ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
      </div>
      <div className="flex flex-col  mt-[17px]">
        <Typography
          variant="subheadBold"
          className={`tracking-[3px] leading-[1.71] mb-[5px] text-white ${inView ? 'text-black' : 'text-white'}`}
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
          <div className="hover:cursor-pointer w-fit">
            <img
              src="/assets/logos/app-store.png"
              alt="app store logo"
              className="max-w-[121px] h-[41px] shadow-logoShadow"
            />
          </div>
        </div>
        <div className={`h-[1px] w-full mt-5 ${inView ? 'bg-black opacity-[0.15]' : 'bg-white/50'}`} />
      </div>
      <div className="mt-[6px] flex flex-col leading-[32px]">
        <Link href="/landing/terms">
          <a>
            <Typography variant="body2" className={`${inView ? 'leading-[2] text-black' : 'leading-[2] text-white'}`}>
              Terms of Service • Privacy Policy
            </Typography>
          </a>
        </Link>

        <Typography variant="body2" className={`${inView ? 'leading-[2] text-black' : 'leading-[2] text-white'}`}>
          © Move, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  )
}
