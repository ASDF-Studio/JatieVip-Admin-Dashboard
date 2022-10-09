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
    <div className={`${className}`}>
      <div className="flex flex-col gap-[29px] sm:gap-[63px]">
        <Hello  />
        <Typography variant="heading3" className="text-center sm:text-left">
          Your Plan
        </Typography>
      </div>
      <div className="w-full max-w-[380px] sm:max-w-full mx-auto sm:mx-0 mt-[12px] sm:mt-[21px] bg-fill-blue pt-[29px] sm:py-[39px] sm:px-[38px] pb-[22px] gap-5 px-5 rounded-[27px] flex flex-col sm:flex-row items-center">
        <div className="flex flex-col  w-full justify-between items-center sm:items-start gap-y-2.5 sm:gap-y-[5px]">
          <div className="flex flex-col items-center sm:items-start">
            <Typography variant="heading4">You are subscribed to</Typography>

            <Typography className="text-primary-brand" variant="heading4">
              3-Months Commitment Plan
            </Typography>
          </div>
          <div className="flex items-center  flex-col gap-y-[15px] sm:flex-row gap-x-[9px]">
            <Typography variant="subhead" className="text-fill-grey text-center sm:text-left">
              Your payment will be automatically renewed every 3-month
            </Typography>
            <Tag text="Next Payement: July 12, 2023 | $38.99" />
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
