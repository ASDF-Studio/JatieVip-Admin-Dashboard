import { Typography } from '@mui/material'
import { Button } from 'components/Button'
import dayjs from 'dayjs'
import { FC } from 'react'

type Props = {
  date?: number
  amount: number
  url?: string
}

export const History: FC<Props> = ({ date = null, amount = 0, url = '' }): React.ReactElement => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <Typography variant="bodyBold">{dayjs.unix(date).format('MMMM DD, YYYY')}</Typography>
        <Typography variant="bodyBold" className="text-primary-grey">
          {`Total including tax $${(amount / 100).toFixed(2)}`}
        </Typography>
      </div>
      <Button
        disableRipple
        variant="text"
        className="hover:underline underline-offset-1"
        onClick={() => {
          window.open(url, '_blank')
        }}
      >
        View Invoice
      </Button>
    </div>
  )
}
