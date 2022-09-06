import { Typography } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  classNames?: ''
}

export const Footer: FC<Props> = ({ classNames }): React.ReactElement => {
  return (
    <div className={`h-[90px] pl-[2.188rem] w-full pr-[1.938rem] items-center fixed bottom-0 flex justify-between ${classNames}`}>
      <div>da</div>
      <div className='flex gap-10'>
        <Typography variant='body2'>Terms of Service • Privacy Policy</Typography>
        <Typography variant='body2'>© Move, Inc. All rights reserved.</Typography>
      </div>
    </div>
  )
}
