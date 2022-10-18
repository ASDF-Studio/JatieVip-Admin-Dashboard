import { Typography } from '@mui/material'
import { Button } from './Button'

type Props = {
  paymentUrl: string
}

export const Warning = ({ paymentUrl = '' }: Props) => {
  return (
    <div className="h-[70px] bg-[#e92346]/10 flex justify-between items-center px-[34px]">
      <Typography className="text-[#e92346]" variant="body2">
        Your last payment failed. Please update your payment method.
      </Typography>
      <Button
        variant="error"
        textClassName="text-white"
        className="w-[165px]"
        onClick={() => {
          window.open(paymentUrl, '_blank')
        }}
      >
        Update
      </Button>
    </div>
  )
}
