import { Typography } from '@mui/material'
import React, { FC } from 'react'
import { ISub } from 'services/types'
import { getSubsName } from 'utils/helper'
import { Button } from '../Button'
import { Tag, TagExpire } from '../tag'

type Props = {
  classname?: string
  onCancel?: () => void
  userSubs?: ISub
}

export const ReActiveSub: FC<Props> = ({ classname, onCancel, userSubs }): React.ReactElement => {
  const { plan } = userSubs
  
  return (
    <div
      className={`${classname} w-full bg-fill-blue pt-[23px] x:pt-[26px] rounded-[24px] pb-[25px] x:pb-5 max-w-[380px] mx-auto sm:max-w-full x:mx-0`}
    >
      <div className="flex flex-col sm:flex-row gap-y-[15px] gap-2 px-5 sm:px-[38px] justify-between items-center">
        <div className="flex flex-col">
          <Typography variant="heading3">You were subscribed to</Typography>
          <Typography variant="heading3">{`${getSubsName(plan).title} Commitment Plan`}</Typography>
        </div>
        <div className="flex flex-col sm:flex-row gap-[15px] w-full max-w-[300px] sm:w-1/2 sm:max-w-full sm:items-center sm:justify-end">
          <TagExpire date={userSubs.cancel_at} />
          <Button
            className="w-full sm:max-w-[12.5rem] sm:order-2 order-1"
            variant="fill"
            textClassName="text-white"
            onClick={onCancel}
          >
            Reactive
          </Button>
        </div>
      </div>
    </div>
  )
}
