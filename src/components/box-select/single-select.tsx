import { Typography } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  icon: React.ReactNode
  text: string
  selected?: boolean
  onClick?: () => void
}

export const SingleSelect: FC<Props> = ({ text, icon, selected = false, onClick }): React.ReactElement => {
  return (
    <div
      onClick={onClick}
      className={`hover:cursor-pointer max-w-[11.875rem] w-full rounded-[25px] bg-fill-blue flex items-center px-6 py-4 gap-2.5 ${
        selected && 'border-2 border-border-blue shadow-singleSelct'
      }`}
    >
      {icon}

      <Typography variant="subheadBold">{text}</Typography>
    </div>
  )
}
