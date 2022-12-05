import { Typography } from '@mui/material'
import { Button, Tag, Hello, TagExpire } from 'components'
import { DownloadApp } from 'components/download-app'
import { useNavigate } from 'hooks/UseRouter'
import { StripeError } from 'lib/error'
import { useRouter } from 'next/router'
import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { IInvoice, ISub } from 'services/types'
import { getSubsName } from 'utils/helper'

type Props = {
  className?: string
  subs: ISub
}

const CurrentSubs: FC<Props> = ({ className, subs }): ReactElement => {
  const { plan } = subs
  const { navigateTo } = useNavigate()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [upcomingInvoice, setUpcomingInvoice] = useState<IInvoice>(null)

  useEffect(() => {
    if (subs.type === 'Mobile') {
      setLoading(false)

      return
    }
    if (subs && !subs.cancel_at) {
      fetcher()
    }
  }, [subs])

  const fetcher = useCallback(async () => {
    try {
      setLoading(true)
      const res = await StripeService.getUpcomingInvoice()
      setUpcomingInvoice(res)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const subsTitle = useCallback(() => {
    return getSubsName(plan)
  }, [plan])

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
            <Typography variant="heading4">
              {subs?.cancel_at ? 'You were subscribed to' : `You are subscribed to`}
            </Typography>

            <Typography className="text-primary-brand" variant="heading4">
              {`${subsTitle().title} Commitment Plan`}
            </Typography>
          </div>
          <div className="flex items-center  flex-col gap-y-[15px] sm:flex-row gap-x-[9px]">
            {!subs?.cancel_at && (
              <Typography variant="subhead" className="text-fill-grey text-center sm:text-left">
                {`Your payment will be automatically renewed every ${subsTitle().nickName}`}
              </Typography>
            )}
            {subs.type !== 'Mobile' &&
              (subs?.cancel_at ? (
                <TagExpire date={subs.current_period_end} />
              ) : (
                <Tag loading={loading} date={upcomingInvoice?.created} price={upcomingInvoice?.amount_due} />
              ))}
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
