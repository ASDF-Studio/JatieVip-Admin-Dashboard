import { Typography } from '@mui/material'
import { AccountSubs, Billing, BoxSelect, Button, ConfirmationModal, Hello } from 'components'
import { FC, ReactElement, useCallback, useState } from 'react'
import { ISelectedProduct, ISub } from 'services/types'
import { BillingModal } from 'ui/modals'
import { getSubsName } from 'utils/helper'

type Props = {
  className?: string
  sub: ISub
}

const ManageSubs: FC<Props> = ({ className, sub }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAutoRenewalModal, setShowAutoRenewalModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [selected, setSelected] = useState<ISelectedProduct>(null)
  const { plan } = sub

  const currentPlan = useCallback(() => {
    return getSubsName(plan)
  }, [plan])

  const isUpgrade = currentPlan().weight < selected?.weight

  const SubsPLans = [
    {
      title: 'Monthly',
      value: '$17.99',
      weight: 1,
    },
    {
      title: '3-Months',
      value: '$14.99/mo',
      discountValue: '$44.97 Total',
      weight: 3,
    },
    {
      title: '6-Months',
      value: '$12.99/mo',
      discountValue: '$77.94 Total',
      weight: 6,
    },
    {
      title: '1 Year',
      value: '$9.99/mo',
      discountValue: '$119.88 Total',
      weight: 12,
    },
  ]

  // const downgradeSub = () => {

  // }

  // const upgradeSub = () => {

  // }

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
          data={SubsPLans.filter((x) => x.title !== currentPlan().title)}
          onChange={(value) => {
            setSelected(value)
          }}
          defaultValue={1}
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
            {isUpgrade ? 'Upgrade' : 'Downgrade'}
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
      <AccountSubs
        userSubs={sub}
        classname="my-[30px] sm:mt-[53px] mb-[4.188rem]"
        onCancel={() => setShowAutoRenewalModal(true)}
      />
      <Billing setShowBillingModal={() => setShowBillingModal(true)} />
      <ConfirmationModal
        open={showModal}
        onAccept={() => {
          console.log('pzda')
        }}
        setOpen={setShowModal}
        contentText={`Are you sure you want to ${
          isUpgrade ? 'upgrade' : 'downgrade'
        } your plan from ${currentPlan()?.title.toLowerCase()} to ${selected?.title.toLocaleLowerCase()}?`}
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
