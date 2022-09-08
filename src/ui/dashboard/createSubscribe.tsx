import { Typography } from '@mui/material'
import { BoxSelect, Button } from 'components'
import { FC, ReactElement } from 'react'

type Props = {
  className?: string
}

const CreateSubs: FC<Props> = ({ className }): ReactElement => {
  return (
    <div className={`${className} gap-5`}>
      <div className="flex flex-col gap-[3.313rem]">
        <Typography variant="heading1">Hey Louis! Welcome to your profile.</Typography>
        <Typography variant="heading3">Upgrade your Plan</Typography>
      </div>
      <div className="w-full bg-fill-blue pt-[2.438rem] pb-[1.688rem] px-[1.875rem] rounded-[27px] gap-8 flex flex-col items-center">
        <BoxSelect
          data={[
            {
              title: 'Monthly',
              value: '$14.99',
            },
            {
              title: '3 Months',
              value: '$12.99/mo',
              discountValue: '$38.97',
            },
            {
              title: '1 Year',
              value: '$12.99/mo',
              discountValue: '$95.88',
            },
          ]}
          classname="bg-primary-white w-[18.75rem]"
        />
        <div className="flex flex-col gap-2.5 items-center">
          <Button
            className="w-[25rem]"
            variant="fill"
            textClassName="text-white"
            // onClick={() => onChangeStep('step2')}
          >
            Subscribe Now
          </Button>
          <Typography variant="bodyBold" className="text-fill-grey">
            7 Days Free trial included with every plan
          </Typography>
        </div>
      </div>
      <div className="w-full bg-fill-blue pl-10 py-8 rounded-[27px] flex justify-between pr-[2.313rem]">
        <Typography variant="heading3">Download our app</Typography>
        <div className="flex gap-[0.563rem]">
          <div className="hover:cursor-pointer">
            <img src="/assets/logos/google-play.png" className="max-w-[8.688rem]" alt="play store logo" />
          </div>
          <div className="hover:cursor-pointer">
            <img src="/assets/logos/app-store.png" className="max-w-[7.563rem]" alt="app store logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSubs
