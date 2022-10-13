import { Typography } from '@mui/material'
import { BoxSelect, Button, Hello } from 'components'
import { FC, ReactElement, useState } from 'react'
import { StripeService } from 'services/stripe'
import { IProductNames } from 'services/types'

type Props = {
  className?: string
}

const CreateSubs: FC<Props> = ({ className }): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<IProductNames>(null)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const stripeSesion = await StripeService.createSession({ selectedProduct: selected })

      window.location.href = stripeSesion.url
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-[29px] sm:gap-[63px]">
        <Hello />
        <Typography variant="heading3" className="text-center sm:text-left">
          Upgrade your Plan
        </Typography>
      </div>
      <div className="w-full max-w-[380px] sm:max-w-full mx-auto sm:mx-0 bg-fill-blue pt-[18px] mt-[21px] px-5 sm:px-[30px] sm:pt-[39px] sm:pb-[27px] rounded-[27px] pb-[23px] gap-5 sm:gap-[32px] flex flex-col items-center">
        <BoxSelect
          onChange={(index) => setSelected(index)}
          data={[
            {
              title: 'Monthly',
              value: '$17.99',
            },
            {
              title: '3-Months',
              value: '$14.99/mo',
              discountValue: '$44.97 Total',
            },
            {
              title: '6-Months',
              value: '$12.99/mo',
              discountValue: '$77.94 Total',
            },
            {
              title: '1 Year',
              value: '$9.99/mo',
              discountValue: '$119.88 Total',
            },
          ]}
          gap="gap-[15px]"
          classname="bg-primary-white sm:w-[226px]"
        />
        <div className="flex flex-col gap-2.5 items-center">
          <Button
            loading={loading}
            disabled={loading}
            className="w-full sm:w-[25rem]"
            variant="fill"
            textClassName="text-white"
            onClick={handleSubscribe}
          >
            Subscribe Now
          </Button>
          <Typography variant="bodyBold" className="text-[#86949f] text-center sm:text-left">
            7-Day Free trial included with every plan
          </Typography>
        </div>
      </div>
      <div className="w-full max-w-[385px] mx-auto sm:mx-0 sm:max-w-full flex-col sm:flex-row bg-fill-blue  py-[30px]  gap-y-[14px] rounded-[27px] flex justify-between items-center mt-[30px] px-[25px] sm:px-[40px]">
        <Typography variant="heading3">Download our app</Typography>
        <div className="flex gap-5 sm:gap-[9px]">
          <div className="hover:cursor-pointer">
            <img
              src="/assets/logos/google-play.png"
              className="max-w-[170px] w-full sm:max-w-[139px] shadow-logoShadow2"
              alt="play store logo"
            />
          </div>
          <div className="hover:cursor-pointer">
            <img
              src="/assets/logos/app-store.png"
              className="max-w-[149px] w-full sm:max-w-[122px] shadow-logoShadow2"
              alt="app store logo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSubs
