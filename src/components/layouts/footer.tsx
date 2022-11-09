import { IconButton, Typography } from '@mui/material'
import { FacebookIcon, TikTokIcon, YoutubeIcon, InstagramIcon, SnapChat } from 'components/icons'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  classNames?: ''
  sticky?: boolean
  hidden?: boolean
}

export const Footer: FC<Props> = ({ classNames, sticky, hidden }): React.ReactElement => {
  return (
    <div
      className={`x:h-[90px] pb-[26px] px-[30px] pt-[38px] x:pl-[2.188rem] w-full x:pr-[1.938rem] items-center flex justify-between ${classNames} ${
        sticky && 'fixed bottom-0'
      } ${hidden && 'x:hidden'} flex-col x:flex-row`}
    >
      <div className="flex justify-between   max-w-[344px]  w-full">
        <IconButton
          className="p-0"
          disableRipple
          onClick={() => {
            window.open('https://www.facebook.com/movefitapp', '_blank')
          }}
        >
          <FacebookIcon className="w-[20px] hover:opacity-80" fill="black" />
        </IconButton>
        <IconButton
          className="p-0"
          disableRipple
          onClick={() => {
            window.open('https://www.tiktok.com/@joshxkatiefit', '_blank')
          }}
        >
          <TikTokIcon className="w-[18px] hover:opacity-80" fill="black" />
        </IconButton>
        <IconButton
          className="p-0"
          disableRipple
          onClick={() => {
            window.open('https://www.snapchat.com/add/themovefitapp', '_blank')
          }}
        >
          <SnapChat className="w-[21px] hover:opacity-80" fill="black" />
        </IconButton>
        <IconButton
          className="p-0"
          disableRipple
          onClick={() => {
            window.open('https://youtube.com/channel/UCHtMq7sjroEvqdWIjFne7NA', '_blank')
          }}
        >
          <YoutubeIcon className="w-[25px] hover:opacity-80" fill="black" />
        </IconButton>

        <IconButton
          className="p-0"
          disableRipple
          onClick={() => {
            window.open('https://www.instagram.com/moveapp/', '_blank')
          }}
        >
          <InstagramIcon className="w-[20px] hover:opacity-80" fill="black" />
        </IconButton>
      </div>
      <div className="flex gap-2.5 x:gap-10 flex-col x:flex-row mt-[22px] x:mt-0">
        <div className="flex gap-2">
          <Link href="/terms">
            <a>
              <Typography variant="body2" className="leading-[2]  underline-offset-1 hover:underline">
                Terms of Service
              </Typography>
            </a>
          </Link>
          <Typography variant="body2" className="leading-[2]  underline-offset-1 hover:underline">
            •
          </Typography>
          <Link href="/privacy">
            <a>
              <Typography variant="body2" className="leading-[2]   underline-offset-1 hover:underline">
                Privacy Policy
              </Typography>
            </a>
          </Link>
        </div>

        <Typography variant="body2" className="leading-[2]">
          © Move, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  )
}
