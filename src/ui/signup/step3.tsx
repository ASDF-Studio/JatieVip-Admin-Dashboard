import { Button, Input } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps, SignUpSteps } from 'types'
import { useNavigate } from 'hooks/UseRouter'
import { ApiErrorResponse } from 'services/api'
import Link from 'next/link'

type Props = {
  onChangeStep: Dispatch<SignUpSteps>
  handleChangeForm: (name: string, value: string) => void
  phoneNumber: string
}

const Step1: React.FC<Props> = ({ onChangeStep, handleChangeForm, phoneNumber }): React.ReactElement => {
  const { navigateTo } = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      // await sendCode(phoneNumber)
      onChangeStep('step4')
    } catch (e) {
      if (e instanceof ApiErrorResponse) {
        console.log(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-[520px] mx-auto px-[26px] x:h-screen overflow-y-auto x:gap-[100px]  x:px-[28px] w-full flex-col x:justify-between pb-[28px] relative">
      <div />
      <div className="w-full x:w-[447px] mx-auto flex-col">
        <div className="flex mt-[28px] x:mt-0 flex-col gap-[12px] mb-[28px] x:mb-[94px]">
          <Typography variant="heading7" className="text-center x:text-left">
            Set up your Username
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <Input
                focus
                placeholder="@Username"
                name="firstName"
                value={phoneNumber}
                // onChange={(e) => handleChangeForm('phoneNumber', e.target.value)}
                className="rounded-[22px] py-[2px] px-3 bg-border-grey"
              />
              <div className="max-w-[380px]">
                <Typography className="text-[#86949f] font-semibold" variant="body2">
                  By continuing you accept our{' '}
                  <Link href="landing/terms">
                    <a className="underline">Privacy Policy</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="landing/terms">
                    <a className="underline">Terms of Use</a>
                  </Link>
                </Typography>
              </div>

              <Button
                color="success"
                className="bg-secondary-light-blue shadow-buttonShadow3"
                textClassName="text-white"
                variant="fill"
                onClick={handleLogin}
                loading={loading}
                disabled={loading}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className=" flex-col items-center  hidden x:flex self-end justify-start">
        <div className="flex items-center gap-3">
          <Link href="/landing/terms">
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
          <Link href="/landing/terms">
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

export default Step1
