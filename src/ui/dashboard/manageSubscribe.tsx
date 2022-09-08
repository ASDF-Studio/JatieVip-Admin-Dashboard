import { Typography } from '@mui/material'
import { AccountSubs, Billing, BoxSelect, Button } from 'components'
import { FC, ReactElement } from 'react'

type Props = {
  className?: string
}

const ManageSubs: FC<Props> = ({ className }): ReactElement => {
  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-[2.813rem]">
        <Typography variant="heading1">Hey Louis! Welcome to your profile.</Typography>
        <Typography variant="heading3">Manage Plan</Typography>
      </div>
      <div className="flex flex-col gap-[2.063rem] mt-[1.375rem]">
        <BoxSelect
          data={[
            {
              title: 'Monthly',
              value: '$14.99',
            },
            {
              title: '1 Year',
              value: '$12.99/mo',
              discountValue: '$95.88',
            },
          ]}
          classname="bg-fill-blue w-1/2"
        />
        <div className="flex flex-col gap-2.5 items-center">
          <Button
            className="w-full max-w-[29.063rem]"
            variant="fill"
            textClassName='text-white'
            // onClick={() => onChangeStep('step2')}
          >
            Upgrade
          </Button>
          <Typography variant="bodyBold" className="text-fill-grey">
            All transactions are secure and encrypted by <span className="text-border-blue">Stripe</span>
          </Typography>
        </div>
      </div>
      <AccountSubs classname="mt-[3.313rem] mb-[4.188rem]" />
      <Billing />
    </div>
  )
}

export default ManageSubs
