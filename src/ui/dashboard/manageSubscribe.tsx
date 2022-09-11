import { Typography } from '@mui/material'
import { AccountSubs, Billing, BoxSelect, Button, ConfirmationModal } from 'components'
import { FC, ReactElement, useState } from 'react'
import { BillingModal } from 'ui/modals'

type Props = {
  className?: string
}

const ManageSubs: FC<Props> = ({ className }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAutoRenewalModal, setShowAutoRenewalModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)

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
            textClassName="text-white"
            onClick={() => setShowModal(true)}
          >
            Upgrade
          </Button>
          <Typography variant="bodyBold" className="text-fill-grey">
            All transactions are secure and encrypted by <span className="text-border-blue">Stripe</span>
          </Typography>
        </div>
      </div>
      <AccountSubs classname="mt-[3.313rem] mb-[4.188rem]" onCancel={() => setShowAutoRenewalModal(true)} />
      <Billing setShowBillingModal={() => setShowBillingModal(true)} />
      <ConfirmationModal
        open={showModal}
        setOpen={setShowModal}
        contentText="Are you sure you want to downgrade your plan from 3 Months to monthly?"
      />
      <ConfirmationModal
        open={showAutoRenewalModal}
        setOpen={setShowAutoRenewalModal}
        contentText="Are you sure you want to cancel Auto Renewal?"
      />
      <BillingModal open={showBillingModal} setOpen={setShowBillingModal} />
    </div>
  )
}

export default ManageSubs
