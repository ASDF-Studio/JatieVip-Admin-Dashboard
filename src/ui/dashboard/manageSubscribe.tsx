import { Typography } from '@mui/material'
import { AccountSubs, Billing, BoxSelect, Button, ConfirmationModal, Hello } from 'components'
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
      <div className="flex flex-col gap-[29px] sm:gap-[63px]">
        <Hello />
        <Typography variant="heading3" className="text-center sm:text-left">
          Manage Plan
        </Typography>
      </div>
      <div className="flex flex-col gap-[15px] sm:gap-[37px] mt-[15px] sm:mt-5">
        <BoxSelect
          data={[
            {
              title: 'Monthly',
              value: '$17.99',
            },
            {
              title: '1 Year',
              value: '$12.99/mo',
              discountValue: '$95.88',
            },
            {
              title: '1 Year',
              value: '$12.99/mo',
              discountValue: '$95.88',
            },
          ]}
          gap="sm:gap-[25px] gap-[15px]"
          classname="bg-fill-blue max-w-[360px] sm:max-w-[320px]"
        />
        <div className="flex flex-col gap-[15px] sm:gap-[13px] items-center">
          <Button
            className="w-full max-w-[360px] sm:max-w-[29.063rem]"
            variant="fill"
            textClassName="text-white"
            onClick={() => setShowModal(true)}
            disableRipple
          >
            Upgrade
          </Button>
          <Typography variant="bodyBold" className="text-fill-grey text-center max-w-[290px] sm:max-w-full">
            All transactions are secure and encrypted by{' '}
            <span
              className="text-border-blue hover:cursor-pointer"
              onClick={() => {
                window.open('https://stripe.com/', '_blank')
              }}
            >
              Stripe
            </span>
          </Typography>
        </div>
      </div>
      <AccountSubs classname="my-[30px] sm:mt-[53px] mb-[4.188rem]" onCancel={() => setShowAutoRenewalModal(true)} />
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
