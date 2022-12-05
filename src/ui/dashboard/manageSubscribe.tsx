import { Typography } from '@mui/material'
import { AccountSubs, Billing, BoxSelect, Button, ConfirmationModal, Hello, ReActiveSub } from 'components'
import { CancelMobileSub } from 'components/modals/cancelMobile'
import { ErrorModal } from 'components/modals/error-modal'
import { MobileAlertModal } from 'components/modals/mobileAlert'
import { SuccessModal } from 'components/modals/success'
import { StripeError } from 'lib/error'
import { useRouter } from 'next/router'
import { FC, ReactElement, useCallback, useEffect, useState, useRef } from 'react'
import { StripeService } from 'services/stripe'
import { ISelectedProduct, ISub } from 'services/types'
import { BillingModal } from 'ui/modals'
import { getSubsName } from 'utils/helper'
import { SubsPLans } from '../../constants'

type Props = {
  className?: string
  sub: ISub
}

type FunctionParams = {
  retry?: boolean
}

type SuccesInfo = {
  from: string
  to: string
  isUpgrade: boolean
  isTrialing: boolean
}

const ManageSubs: FC<Props> = ({ className, sub }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAutoRenewalModal, setShowAutoRenewalModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [selected, setSelected] = useState<ISelectedProduct>(SubsPLans[1] as ISelectedProduct)
  const [currentSubs, setCurrentSubs] = useState<ISub>(sub)
  const [showReactiveModal, setShowReactiveModal] = useState(false)
  const [succesModal, setSuccessModal] = useState(false)
  const [linkModal, setLinkModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string>(null)
  const [reactivateText, setReactivateText] = useState<string>('Are you sure you want to activate Auto Renewal?')
  const [successInfo, setSuccessInfo] = useState<SuccesInfo>(null)
  const [showMobileCancel, setShowMobileCancel] = useState(false)
  const [showMobileAlert, setShowMobileAlert] = useState(false)
  const router = useRouter()
  const { plan } = currentSubs

  const retryFunRef = useRef<({ retry }: { retry: boolean }) => Promise<void>>(null)

  const currentPlan = useCallback(() => {
    return getSubsName(plan)
  }, [plan])

  const isUpgrade = currentPlan().weight < selected?.weight

  const createScheduleSub = useCallback(
    async (params: FunctionParams) => {
      const { retry = false } = params || {}

      try {
        const res = await StripeService.createScheduleSub({
          selectedProduct: selected.title,
        })
        setShowError(false)
        setCurrentSubs(res)
        setSuccessInfo({
          isUpgrade,
          isTrialing: currentSubs.status === 'trialing',
          from: currentPlan().title,
          to: selected.title,
        })

        setSuccessModal(true)
      } catch (e) {
        if (e instanceof StripeError) {
          if (e.statusCode === 401) {
            router.push('/login')
          } else {
            if (!retry) {
              retryFunRef.current = createScheduleSub
              setShowError(true)
            }
            setError(e.message)
          }
        }
      }
    },
    [selected],
  )

  const cancelAutoRenewal = useCallback(async (params: FunctionParams) => {
    const { retry = false } = params || {}
    try {
      const res = await StripeService.updateCurrentSub({
        endAtThePeriod: true,
      })
      setCurrentSubs(res)
      setSelected(null)
      setShowError(false)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        } else {
          if (!retry) {
            retryFunRef.current = cancelAutoRenewal
            setShowError(true)
          }
          setError(e.message)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!currentSubs.cancel_at) {
      setSelected(SubsPLans.filter((x) => x.title !== currentPlan().title)[1] as ISelectedProduct)
    }
  }, [currentSubs])

  const reActiveSubs = useCallback(async (params: FunctionParams) => {
    const { retry = false } = params || {}
    try {
      const res = await StripeService.updateCurrentSub({
        endAtThePeriod: false,
      })
      setCurrentSubs(res)
      setShowError(false)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        } else {
          if (!retry) {
            retryFunRef.current = reActiveSubs
            setShowError(true)
          }
          setError(e.message)
        }
      }
    }
  }, [])

  const removePayment = useCallback(async () => {
    try {
      const res = await StripeService.removePayment()
      setCurrentSubs(res)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        } else {
          setError(e.message)
          setShowError(true)
        }
      }
    }
  }, [])

  const onClose = () => {
    setSelected(null)
  }

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
            if (currentSubs.cancel_at) {
              setReactivateText('To choose a new plan, you have to reactivate Auto Renewal.')
              setShowReactiveModal(true)
            }
            setSelected(value)
          }}
          gap="sm:gap-[25px] gap-[15px]"
          selected={selected}
          classname="bg-fill-blue max-w-[360px] sm:max-w-[320px]"
        />
        <div className="flex flex-col gap-[15px] sm:gap-[13px] items-center">
          <Button
            className="w-full max-w-[360px] sm:max-w-[29.063rem]"
            variant="fill"
            textClassName="text-white"
            onClick={() => {
              if (currentSubs.cancel_at) {
                setReactivateText('Are you sure you want to activate Auto Renewal?')
                setShowReactiveModal(true)
              } else {
                if (currentSubs.type === 'Mobile') {
                  setShowMobileAlert(true)

                  return
                }
                setShowModal(true)
              }
            }}
            disableRipple
          >
            {currentSubs.cancel_at ? 'Reactivate' : isUpgrade ? 'Upgrade' : 'Downgrade'}
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
      {currentSubs?.cancel_at ? (
        <ReActiveSub
          userSubs={currentSubs}
          classname="my-[30px] sm:mt-[53px] mb-[4.188rem]"
          onCancel={() => {
            setReactivateText('Are you sure you want to activate Auto Renewal?')
            setShowReactiveModal(true)
          }}
        />
      ) : (
        <AccountSubs
          userSubs={currentSubs}
          classname="my-[30px] sm:mt-[53px] mb-[4.188rem]"
          onCancel={() => (currentSubs.type === 'Mobile' ? setShowMobileCancel(true) : setShowAutoRenewalModal(true))}
        />
      )}

      <Billing
        sub={currentSubs}
        // cardName={currentSubs?.default_payment_method?.billing_details?.name}
        setShowLinkModal={() => setLinkModal(true)}
        setShowBillingModal={() => setShowBillingModal(true)}
      />
      <ConfirmationModal
        open={showModal}
        onAccept={createScheduleSub}
        setOpen={setShowModal}
        contentText={`Are you sure you want to ${
          isUpgrade ? 'upgrade' : 'downgrade'
        } your plan from ${currentPlan()?.title.toLowerCase()} to ${selected?.title.toLocaleLowerCase()}?`}
      />
      <ConfirmationModal
        open={showAutoRenewalModal}
        setOpen={setShowAutoRenewalModal}
        onAccept={cancelAutoRenewal}
        contentText="Are you sure you want to cancel Auto Renewal?"
      />
      <ConfirmationModal
        open={showReactiveModal}
        setOpen={setShowReactiveModal}
        onAccept={reActiveSubs}
        onClose={onClose}
        acceptText="Reactivate"
        cancelText="No, Keep Me Canceled"
        contentText={reactivateText}
      />
      <ConfirmationModal
        open={linkModal}
        setOpen={setLinkModal}
        cancelText="No"
        onAccept={removePayment}
        contentText="Are you sure you want to unlink card?"
      />
      <ErrorModal onAccept={retryFunRef.current} open={showError} setOpen={setShowError} error={error} />
      <SuccessModal
        to={successInfo?.to}
        isTrialing={successInfo?.isTrialing}
        isUpgrade={successInfo?.isUpgrade}
        open={succesModal}
        setOpen={setSuccessModal}
        from={successInfo?.from}
      />
      <CancelMobileSub open={showMobileCancel} setOpen={setShowMobileCancel} />
      <MobileAlertModal open={showMobileAlert} setOpen={setShowMobileAlert} />
      <BillingModal open={showBillingModal} setOpen={setShowBillingModal} />
    </div>
  )
}

export default ManageSubs
