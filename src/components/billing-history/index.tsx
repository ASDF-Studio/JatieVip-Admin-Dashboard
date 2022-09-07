import { Typography } from '@mui/material'
import { History } from './history'

export const Billing = () => {
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
        <div className="pt-[1.563rem] pl-[1.813rem] pb-[1.688rem] rounded-[18px] bg-fill-lightBlue flex justify-between">
          <div className="flex flex-col max-w-[15.063rem]">
            <Typography className="text-primary-grey" variant="bodyBold">
              Louis Griffin
            </Typography>
            <br />
            <Typography className="text-primary-grey" variant="bodyBold">
              louisgriffin@gmail.com +01 029 2992
            </Typography>
            <br />
            <Typography className="text-primary-grey" variant="bodyBold">
              6634 N Minnehaha Ave Lincolnwood, Illinois 60712 United States
            </Typography>
          </div>
        </div>
        
      </div>
    </div>
  )
}
