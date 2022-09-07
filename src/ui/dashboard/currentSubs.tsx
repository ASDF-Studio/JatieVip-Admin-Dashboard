import { Typography } from '@mui/material'
import { Button, Tag } from 'components'
import { DownloadApp } from 'components/download-app'
import { useNavigate } from 'hooks/UseRouter'
import { FC, ReactElement } from 'react'

type Props = {
  className?: string
}

const CurrentSubs: FC<Props> = ({ className }): ReactElement => {
  const { navigateTo } = useNavigate()

  return (
    <div className={`${className} gap-5`}>
      <div className="flex flex-col gap-[3.313rem]">
        <Typography fontFamily="Avenir Next LT Pro" variant="heading1">
          Hey Louis! Welcome to your profile.
        </Typography>
        <Typography fontFamily="Avenir Next LT Pro" variant="heading3">
          Your Plan
        </Typography>
      </div>
      <div className="w-full bg-fill-blue pt-[2.438rem] pb-[1.688rem] px-[1.875rem] rounded-[27px] gap-8 flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <Typography variant="heading4">You are subscribed to</Typography>
            <Typography className="text-text-blue" variant="heading4">
              3-Months Commitment Plan
            </Typography>
          </div>

          <Button
            color="primary"
            className="bg-secondary-light-blue rounded-[22px] shadow-buttonShadow w-[10.313rem] pt-[0.77rem] pb-[0.605rem]"
            variant="fill"
            onClick={() => navigateTo('account/plan')}
          >
            <Typography className="text-white" variant="label1" fontFamily="Avenir Next LT Pro">
              Manage
            </Typography>
          </Button>
        </div>
        <div className="flex gap-[1.313rem] items-center">
          <Typography variant="subhead" className="text-fill-grey">
            Your payment will be automatically renewed every 3 months
          </Typography>
          <Tag text="Next Payement: July 12, 2023 | $38.99" />
        </div>
      </div>
      <DownloadApp />
    </div>
  )
}

export default CurrentSubs
