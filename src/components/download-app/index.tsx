import { Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'

export const DownloadApp: FC = (): React.ReactElement => {
  return (
    <div className="w-full max-w-[385px] mx-auto sm:mx-0 sm:max-w-full flex-col sm:flex-row bg-fill-blue  py-[30px]  gap-y-[14px] rounded-[27px] flex justify-between items-center mt-[30px] px-[25px] sm:px-[40px]">
      <Typography variant="heading3">Download our app</Typography>
      <div className="flex gap-5 x:gap-[9px]">
        <Link href="https://play.google.com/store/apps/details?id=com.movefitness.app">
          <a>
            <div className="hover:cursor-pointer">
              <img
                src="/assets/logos/google-play.png"
                className="max-w-[170px] w-full x:max-w-[139px] shadow-logoShadow2"
                alt="play store logo"
              />
            </div>
          </a>
        </Link>
        <Link href="https://apps.apple.com/us/app/jatievip/id1665362080">
          <a>
            <div className="hover:cursor-pointer">
              <img
                src="/assets/logos/app-store.png"
                className="max-w-[149px] w-full x:max-w-[122px] shadow-logoShadow2"
                alt="app store logo"
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
