import { Typography } from '@mui/material'
import { BoxSelect, Button, Hello } from 'components'
import { ErrorModal } from 'components/modals/error-modal'
import { StripeError } from 'lib/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactElement, useState } from 'react'
import { StripeService } from 'services/stripe'
import { ISelectedProduct } from 'services/types'
import { SubsPLans } from '../../constants'

type Props = {
  className?: string
}

const CreateSubs: FC<Props> = ({ className }): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<ISelectedProduct>(SubsPLans[1] as ISelectedProduct)
  const [error, setError] = useState<string>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter()

  const handleSubscribe = async () => {
    setLoading(true)
    setShowError(false)
    try {
      const stripeSesion = await StripeService.createSession({ selectedProduct: selected.title })

      window.location.href = stripeSesion.url
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
          data={SubsPLans}
          gap="gap-[15px]"
          selected={selected}
          classname="bg-primary-white sm:w-[226px]"
        />
        <div className="flex flex-col gap-2.5 items-center">
          <Button
            loading={loading}
            disabled={loading || !selected}
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
          <Link href="https://play.google.com/store/apps/details?id=com.movefitness.app">
            <a>
              <div className="hover:cursor-pointer">
                <img
                  src="/assets/logos/google-play.png"
                  className="max-w-[170px] w-full sm:max-w-[139px] shadow-logoShadow2"
                  alt="play store logo"
                />
              </div>
            </a>
          </Link>
          <Link href="https://apps.apple.com/us/app/move-fitness-app/id1623388100">
            <a>
              <div className="hover:cursor-pointer">
                <img
                  src="/assets/logos/app-store.png"
                  className="max-w-[149px] w-full sm:max-w-[122px] shadow-logoShadow2"
                  alt="app store logo"
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
      <ErrorModal isCreate onAccept={handleSubscribe} open={showError} setOpen={setShowError} error={error} />
    </div>
  )
}

export default CreateSubs
