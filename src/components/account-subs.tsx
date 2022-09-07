import { Typography } from '@mui/material'
import React, { FC } from 'react'
import { Button } from './Button'
import { Tag } from './tag'

type Props = {
  classname?: string
}

export const AccountSubs: FC<Props> = ({ classname }): React.ReactElement => {
  return (
    <div className={`${classname} w-full bg-fill-blue pt-[1.688rem] rounded-[24px] pb-5`}>
      <div className="flex flex-col gap-2 px-[2.375rem]">
        <div className="flex justify-between items-center">
          <Typography variant="heading3">You are subscribed to</Typography>
          <Tag text="Next Payement: July 12, 2023 | $38.99" />
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="heading3" className="text-border-blue">
            3-Months Commitment Plan
          </Typography>
          <Typography align="right" variant="subheadBold" className="w-[15.625rem] text-primary-grey">
            Your payment will be automatically renewed every 3 months
          </Typography>
        </div>
      </div>
      <div className="w-full h-px bg-border-blue mt-[1.531rem] mb-[0.969rem]" />
      <div className="flex flex-col px-[2.375rem] gap-[0.938rem]">
        <Typography variant="subhead" className="text-primary-grey">
          After canceling, you'll be able to use Movefit until the end of the current billing period.
        </Typography>
        <Button className="border-border-blue border border-solid bg-white w-[12.5rem] rounded-[22px]" variant="ghost">
          <Typography textTransform="capitalize" variant="bodyBold" className="border-border-blue">
            Cancel Renewal
          </Typography>
        </Button>
      </div>
    </div>
  )
}
