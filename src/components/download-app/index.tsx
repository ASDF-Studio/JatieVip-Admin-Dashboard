import { Typography } from '@mui/material'
import React, { FC } from 'react'

export const DownloadApp: FC = (): React.ReactElement => {
  return (
    <div className="w-full bg-fill-blue pl-10 py-8 rounded-[27px] flex justify-between pr-[2.313rem]">
      <Typography variant="heading3">Download our app</Typography>
      <div className="flex gap-[0.563rem]">
        <div className="hover:cursor-pointer">
          <img src="/assets/logos/google-play.png" className="max-w-[8.688rem]" alt="play store logo" />
        </div>
        <div className="hover:cursor-pointer">
          <img src="/assets/logos/app-store.png" className="max-w-[7.563rem]" alt="app store logo" />
        </div>
      </div>
    </div>
  )
}
