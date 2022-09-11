import { IconButton, Typography } from '@mui/material'
import { History } from './history'

type Props = {
  setShowBillingModal: () => void
}

export const Billing: React.FC<Props> = ({ setShowBillingModal }): React.ReactElement => {
  return (
    <div className="w-full flex justify-between gap-[3.938rem]">
      <div className="w-1/2 flex flex-col gap-[1.313rem]">
        <Typography variant="heading3">Billing History</Typography>
        <div className="flex flex-col gap-2.5">
          <Typography variant="bodyBold" className="text-primary-grey">
            You can view and download all your previous invoices here. If you’ve just made a payment, it may take a few
            hours for it to appear.
          </Typography>
          <div className="flex flex-col gap-[3.906rem]">
            <History />
            <History />
            <History />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-[1.313rem]">
        <Typography variant="heading3">Billing Address</Typography>
        <div className="pt-[1.563rem] pr-[1.063rem] pl-[1.813rem] pb-[1.688rem] rounded-[18px] bg-fill-lightBlue flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <Typography className="text-primary-grey" variant="bodyBold">
                Louis Griffin
              </Typography>
              <IconButton
                aria-label="edit"
                onClick={setShowBillingModal}
                sx={{
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                  '&.MuiButtonBase-root:active': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                <div className="w-[34px] h-[34px] bg-fill-pink flex justify-center items-center rounded-md">
                  <img src="/assets/svg/pen.svg" alt="pen svg" className="w-[16px] h-[16px]" />
                </div>
              </IconButton>
            </div>

            <br />
            <Typography className="text-primary-grey" variant="bodyBold" maxWidth="15.063rem">
              louisgriffin@gmail.com +01 029 2992
            </Typography>
            <br />
            <Typography className="text-primary-grey" variant="bodyBold" maxWidth="15.063rem">
              6634 N Minnehaha Ave Lincolnwood, Illinois 60712 United States
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
