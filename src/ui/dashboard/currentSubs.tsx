import { Typography } from '@mui/material'
import { Button, Tag, Hello } from 'components'
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
        <Hello />
        <Typography variant="heading3">Your Plan</Typography>
      </div>
      <div className="w-full bg-fill-blue pt-[2.438rem] pb-[1.688rem] px-[1.875rem] rounded-[27px] gap-8 flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <Typography variant="heading4">You are subscribed to</Typography>
            <br />
            <Typography className="text-text-blue" variant="heading4">
              3-Months Commitment Plan
            </Typography>
          </div>

          <Button
            color="primary"
            className="w-[10.313rem]"
            variant="fill"
            textClassName="text-white"
            onClick={() => navigateTo('account/plan')}
          >
            Manage
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
