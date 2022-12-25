import { CircularProgress, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { FC } from 'react'

type Props = {
  date: number
  price?: number
  loading?: boolean
}

export const Tag: FC<Props> = ({ date = null, price = 0, loading = false }): React.ReactElement => {
  return loading ? (
    <div className="w-8 h-8 flex items-center justify-center">
      <CircularProgress className="w-5 h-5" />
    </div>
  ) : (
    <div className="rounded-[14px] px-4 pt-1.5 pb-1 bg-primary-brand/10">
      <Typography className="text-primary-brand" variant="label2">
        {/* {`Next Payment: ${dayjs.unix(date).format('MMMM DD, YYYY')} | $${(price / 100).toFixed(2)}`} */}
        {`Next Payment: ${dayjs.unix(date).format('MMMM DD, YYYY')}`}
      </Typography>
    </div>
  )
}

export const TagExpire = ({ date = null }): React.ReactElement => {
  return (
    <div className="rounded-[14px] px-4 pt-1.5 pb-1 bg-primary-brand/10 w-fit shrink-0">
      <Typography className="text-primary-brand" variant="label2">
        {`Expires: ${dayjs.unix(date).format('MMMM DD, YYYY')}`}
      </Typography>
    </div>
  )
}

export * from './tag-image'
