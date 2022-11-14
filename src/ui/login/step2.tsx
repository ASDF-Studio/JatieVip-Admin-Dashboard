import { Button, VerifyCodeInput } from 'components'
import React, { Dispatch, useState } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useAuth } from 'Contexts/Auth'
import Link from 'next/link'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
  phoneNumber: string
  code: string
  handleChangeForm: any
  sumbitForm: any
  error: boolean
  setError: (err: boolean) => void
}

const Step2: React.FC<Props> = ({
  onChangeStep,
  phoneNumber,
  code,
  handleChangeForm,
  sumbitForm,
  error = false,
  setError,
}): React.ReactElement => {
  const { sendCode } = useAuth()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleSumbitForm = async () => {
    if (code.length !== 5) {
      return
    }
    setError(false)

    try {
      setLoading(true)
      await sumbitForm()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setResendLoading(true)
      await sendCode(`+${phoneNumber}`)
      setError(false)
    } catch (e) {
      console.log(e)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex max-w-[520px] mx-auto px-[26px] x:h-screen overflow-y-auto x:gap-[100px]  x:px-[28px] w-full flex-col x:justify-between pb-[28px] relative">
      <div />
      <form onKeyUp={(e) => e.code === 'Enter' && handleSumbitForm()}>
        <div className="w-full x:max-w-[447px] mx-auto flex-col mt-[36px] x:mt-0">
          <div className="flex justify-center x:justify-start">
            <Typography variant="heading7" className="text-center x:text-left">
              Verify Login
            </Typography>
          </div>

          <div className="flex flex-col mt-[44px] gap-5">
            <div className="flex flex-col gap-[9px]">
              <Typography variant="body2" className="font-semibold">
                Verification Code
              </Typography>
              <div className="flex flex-col">
                <Typography className="text-[#86949f] font-semibold" variant="body2">
                  Please enter the verification code
                </Typography>
                <div className="flex">
                  <Typography className="text-[#86949f] font-semibold" variant="body2">
                    that was sent to {`+${phoneNumber}`}&nbsp;&nbsp;
                  </Typography>
                  <span onClick={() => onChangeStep('step1')} className="hover:cursor-pointer">
                    <Typography variant="body2" className=" text-primary-brand font-semibold">
                      Edit
                    </Typography>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <VerifyCodeInput error={error} length={5} code={code} onChange={(cd) => handleChangeForm('code', cd)} />
              {error && (
                <div className="flex items-center">
                  <Typography className="text-text-error font-medium" variant="body2">
                    Sorry, the code didn’t match.&nbsp;
                  </Typography>
                  {resendLoading ? (
                    <CircularProgress size={15} color="error" />
                  ) : (
                    <Typography
                      onClick={handleResendCode}
                      className="text-text-error underline hover:cursor-pointer font-medium"
                      variant="body2"
                    >
                      Resend
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <Button
              onClick={handleSumbitForm}
              disabled={code.length !== 5 || loading}
              loading={loading}
              className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow"
              variant="fill"
              textClassName="text-white"
            >
              Verify & Login
            </Button>
          </div>
        </div>
      </form>
      <div className=" flex-col items-center  hidden x:flex self-end justify-start">
        <div className="flex items-center gap-3">
          <Link href="/terms">
            <a>
              <Typography
                className="leading-[1.88] font-semibold text-black hover:underline underline-offset-1"
                variant="body2"
              >
                Terms of service
              </Typography>
            </a>
          </Link>
          <Typography
            className="leading-[1.88] font-semibold text-black hover:underline underline-offset-1"
            variant="body2"
          >
            •
          </Typography>
          <Link href="/privacy-policy">
            <a>
              <Typography
                className="leading-[1.88] font-semibold text-black hover:underline underline-offset-1"
                variant="body2"
              >
                Privacy Policy
              </Typography>
            </a>
          </Link>
        </div>
        <Typography className="leading-[2] text-black" variant="body2">
          © Move, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  )
}

export default Step2
