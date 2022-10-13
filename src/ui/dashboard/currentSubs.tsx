import { Typography } from '@mui/material'
import { Button, Tag, Hello } from 'components'
import { DownloadApp } from 'components/download-app'
import { useNavigate } from 'hooks/UseRouter'
import { FC, ReactElement } from 'react'
import { ISub } from 'services/types'
import { getSubsName } from 'utils/helper'

type Props = {
  className?: string
  subs: ISub
}

const CurrentSubs: FC<Props> = ({ className, subs }): ReactElement => {
  const { plan } = subs
  const { navigateTo } = useNavigate()

  console.log(subs.plan)

  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-[29px] sm:gap-[63px]">
        <Hello />
        <Typography variant="heading3" className="text-center sm:text-left">
          Your Plan
        </Typography>
      </div>
      <div className="w-full max-w-[380px] sm:max-w-full mx-auto sm:mx-0 mt-[12px] sm:mt-[21px] bg-fill-blue pt-[29px] sm:py-[39px] sm:px-[38px] pb-[22px] gap-5 px-5 rounded-[27px] flex flex-col sm:flex-row items-center">
        <div className="flex flex-col  w-full justify-between items-center sm:items-start gap-y-2.5 sm:gap-y-[5px]">
          <div className="flex flex-col items-center sm:items-start">
            <Typography variant="heading4">You are subscribed to</Typography>

            <Typography className="text-primary-brand" variant="heading4">
              {`${getSubsName(plan)} Commitment Plan`}
            </Typography>
          </div>
          <div className="flex items-center  flex-col gap-y-[15px] sm:flex-row gap-x-[9px]">
            <Typography variant="subhead" className="text-fill-grey text-center sm:text-left">
              {`Your payment will be automatically renewed every ${plan?.interval_count}-${plan?.interval}`}
            </Typography>
            <Tag date={subs?.current_period_end} price={plan.amount} />
          </div>
        </div>
        <Button
          color="primary"
          className="max-w-[340px] w-full sm:w-[200px]"
          variant="fill"
          textClassName="text-white"
          onClick={() => navigateTo('account/plan')}
        >
          Manage
        </Button>
      </div>
      <DownloadApp />
    </div>
  )
}

export default CurrentSubs
