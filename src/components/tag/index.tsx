import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import { FC } from 'react'

type Props = {
  date: number
  price: number
}

export const Tag: FC<Props> = ({ date = null, price = 0 }): React.ReactElement => {
  return (
    <div className="rounded-[14px] px-4 pt-1.5 pb-1 bg-primary-brand/10">
      <Typography className="text-primary-brand" variant="label2">
        {`Next Payement: ${dayjs.unix(date).format('MMMM DD,YYYY')} | $${(price / 100).toFixed(2)}`}
      </Typography>
    </div>
  )
}

export * from './tag-image'
