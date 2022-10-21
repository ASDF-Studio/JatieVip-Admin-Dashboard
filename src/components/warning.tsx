import { Typography } from '@mui/material'
import { Button } from './Button'

type Props = {
  paymentUrl: string
}

export const Warning = ({ paymentUrl = '' }: Props) => {
  return (
    <div className="bg-[#e92346]/10 flex sm:justify-between items-center px-[34px] flex-col sm:flex-row sm:py-[13px] py-[24px] gap-y-[20px]">
      <Typography className="text-[#e92346]" variant="body2">
        Your last payment failed. Please update your payment method.
      </Typography>
      <Button
        variant="error"
        textClassName="text-white"
        className="w-full sm:w-[165px]"
        onClick={() => {
          window.open(paymentUrl, '_blank')
        }}
      >
        Update
      </Button>
    </div>
  )
}
