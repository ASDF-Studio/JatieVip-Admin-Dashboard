/* eslint-disable camelcase */
import { IconButton, Typography } from '@mui/material'
import { Button } from 'components/Button'
import { LinkSlashIcon } from 'components/icons'
import { useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { IInvoice } from 'services/types'
import { History } from './history'

type Props = {
  setShowBillingModal: () => void
}

export const Billing: React.FC<Props> = ({ setShowBillingModal }): React.ReactElement => {
  const [invoices, setInvoices] = useState<IInvoice[]>([])
  const [isMore, setIsMore] = useState<boolean>(false)

  useEffect(() => {
    fetcher('')
  }, [])

  const fetcher = async (startAfter: '') => {
    try {
      const data = await StripeService.listUserInvoice({
        startingAfter: startAfter,
      })
      setInvoices([...invoices, ...data.data])
      setIsMore(data.has_more)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="w-full  sm:w-full flex flex-col items-center sm:items-start sm:flex-row sm:justify-between gap-[40px]  sm:gap-[3.938rem]">
      <div className="max-w-[380px] w-full sm:max-w-[490px] flex flex-col gap-[15px] order-3 sm:order-1">
        <Typography variant="heading3">Billing History</Typography>
        <div className="flex flex-col gap-2.5">
          <Typography className="text-primary-grey text-[16px] font-medium">
            You can view and download all your previous invoices here. If you’ve just made a payment, it may take a few
            hours for it to appear.
          </Typography>
          <div className="flex flex-col gap-[30px] mt-[23px]">
            {invoices &&
              invoices.map(({ hosted_invoice_url, amount_paid, status_transitions, status }, index) => {
                return (
                  <div className="flex flex-col gap-[30px]">
                    {index !== 0 && <div className="h-px w-full bg-[#f5f7f9]" />}
                    <History amount={amount_paid} date={status_transitions.paid_at} url={hosted_invoice_url} />
                  </div>
                )
              })}
            {isMore && (
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    fetcher(invoices[invoices.length - 1].id)
                  }}
                  variant="text"
                  textVariant="bodyBold"
                  disableRipple
                >
                  Load More…
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[380px] sm:max-w-[490px] w-full order-1 flex flex-col sm:order-2">
        <div className="w-full flex flex-col gap-[12px]">
          <Typography variant="heading3">Linked Card</Typography>
          <div className="rounded-[18px] bg-fill-lightBlue h-[67px] flex justify-between items-center pl-[29px] pr-[17px] ">
            <Typography className="text-primary-grey text-[16px] font-medium">Louis Griffin</Typography>
            <IconButton
              aria-label="edit"
              // onClick={setShowBillingModal}
              disableRipple
              sx={{
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
                '&.MuiButtonBase-root:active': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <div className="w-[34px] h-[34px] bg-[#86949f] hover:bg-[#17AEDC] flex justify-center items-center rounded-md">
                <LinkSlashIcon className="w-[16px] h-[16px] fill-white" />
              </div>
            </IconButton>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[12px] mt-[40px] sm:mt-[44px] order-2 sm:order-3">
          <Typography variant="heading3">Billing Address</Typography>
          <div className="pl-[29px] pr-[17px] py-[17px] rounded-[18px] bg-fill-lightBlue flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <Typography className="text-primary-grey text-[16px] font-medium">Louis Griffin</Typography>
                <IconButton
                  aria-label="edit"
                  onClick={setShowBillingModal}
                  disableRipple
                  sx={{
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent',
                    },
                    '&.MuiButtonBase-root:active': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <div className="w-[34px] h-[34px] bg-primary-brand hover:bg-[#17AEDC] flex justify-center items-center rounded-md">
                    <img src="/assets/svg/pen.svg" alt="pen svg" className="w-[16px] h-[16px]" />
                  </div>
                </IconButton>
              </div>

              <br />
              <Typography className="text-primary-grey text-[16px] font-medium" maxWidth="15.063rem">
                louisgriffin@gmail.com +01 029 2992
              </Typography>
              <br />
              <Typography className="text-primary-grey text-[16px] font-medium" maxWidth="15.063rem">
                6634 N Minnehaha Ave Lincolnwood, Illinois 60712 United States
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
