import { Typography } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  classNames?: ''
  sticky?: boolean
}

export const Footer: FC<Props> = ({ classNames, sticky }): React.ReactElement => {
  return (
    <div
      className={`h-[90px] pl-[2.188rem] w-full pr-[1.938rem] items-center flex justify-between ${classNames} ${
        sticky && 'fixed bottom-0'
      }`}
    >
      <div className="flex gap-[2.563rem] items-center">
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
          <img src="/assets/svg/youtube.svg" className="w-6 h-10" alt="facebook logo" />
        </div>
        <div className="hover:scale-110 hover:cursor-pointer">
          <img src="/assets/svg/instagram.svg" className="w-5 h-5" alt="facebook logo" />
        </div>
      </div>
      <div className="flex gap-10">
        <Typography variant="body2">Terms of Service • Privacy Policy</Typography>
        <Typography variant="body2">© Move, Inc. All rights reserved.</Typography>
      </div>
    </div>
  )
}
