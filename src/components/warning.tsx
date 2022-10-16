import { Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { StripeService } from 'services/stripe'
import { Button } from './Button'

export const Warning = () => {
  useEffect(() => {
    fetcher()
  }, [])

  const fetcher = useCallback(async () => {
    try {
      const res = await StripeService.getSubsSchedule()
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div className="h-[70px] bg-primary-brand/10 flex justify-between items-center px-[34px]">
      <Typography className="text-primary-brand" variant="body2">
        Your subscription plane is going to change dadada at{' '}
      </Typography>
      <Button variant="fill" textClassName="text-white" className='w-[165px]'>
        Cancel
      </Button>
    </div>
  )
}
