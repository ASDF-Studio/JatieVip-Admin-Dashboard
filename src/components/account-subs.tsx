import { Typography } from '@mui/material'
import React, { FC } from 'react'
import { ISub } from 'services/types'
import { getSubsName } from 'utils/helper'
import { Button } from './Button'
import { Tag } from './tag'

type Props = {
  classname?: string
  onCancel?: () => void
  userSubs?: ISub
}

export const AccountSubs: FC<Props> = ({ classname, onCancel, userSubs }): React.ReactElement => {
  
  const { plan } = userSubs

  return (
    <div
      className={`${classname} w-full bg-fill-blue pt-[23px] x:pt-[26px] rounded-[24px] pb-[25px] x:pb-5 max-w-[380px] mx-auto sm:max-w-full x:mx-0`}
    >
      <div className="flex flex-col sm:flex-row gap-y-[15px] gap-2 px-5 sm:px-[38px] justify-between">
        <div className="flex flex-col">
          <Typography variant="heading3">You are subscribed to</Typography>
          <Typography variant="heading3">{`${getSubsName(plan).title} Commitment Plan`}</Typography>
        </div>
        <div className="flex flex-col gap-[15px] max-w-[300px] sm:max-w-full sm:items-end">
          <Tag date={userSubs?.current_period_end} price={plan.amount} />
          <Typography variant="subheadBold" className="w-[15.625rem] text-primary-grey text-left sm:text-right">
            {`Your payment will be automatically renewed every ${getSubsName(plan).nickName}`}
          </Typography>
        </div>
      </div>
      <div className="w-full h-[2px] bg-primary-brand mt-[27px] mb-[28px] sm:mt-[25px] sm:mb-[15px]" />
      <div className="flex flex-col px-5 sm:px-[38px] gap-[15px]">
        <Typography variant="subhead" className="text-primary-grey sm:order-1 order-2 text-center sm:text-left">
          After canceling, you&apos;ll be able to use Movefit until the end of the current billing period.
        </Typography>
        <Button className="w-full sm:max-w-[12.5rem] sm:order-2 order-1" variant="ghost" onClick={onCancel}>
          Cancel Renewal
        </Button>
      </div>
    </div>
  )
}
