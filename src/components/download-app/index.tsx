import { Typography } from '@mui/material'
import React, { FC } from 'react'

export const DownloadApp: FC = (): React.ReactElement => {
  return (
    <div className="w-full max-w-[385px] mx-auto sm:mx-0 sm:max-w-full flex-col sm:flex-row bg-fill-blue  py-[30px]  gap-y-[14px] rounded-[27px] flex justify-between items-center mt-[30px] px-[25px] sm:px-[40px]">
      <Typography variant="heading3">Download our app</Typography>
      <div className="flex gap-5 x:gap-[9px]">
        <div className="hover:cursor-pointer">
          <img
            src="/assets/logos/google-play.png"
            className="max-w-[170px] w-full x:max-w-[139px] shadow-logoShadow2"
            alt="play store logo"
          />
        </div>
        <div className="hover:cursor-pointer">
          <img
            src="/assets/logos/app-store.png"
            className="max-w-[149px] w-full x:max-w-[122px] shadow-logoShadow2"
            alt="app store logo"
          />
        </div>
      </div>
    </div>
  )
}
