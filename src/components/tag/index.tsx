import { Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
  text: string
}

export const Tag: FC<Props> = ({ text }): React.ReactElement => {
  return (
    <div className="rounded-[14px] px-4 pt-1.5 pb-1 bg-fill-spice/10">
      <Typography className="text-fill-spice" variant="label2">
        {text}
      </Typography>
    </div>
  )
}

export * from './tag-image'