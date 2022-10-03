import { Button, Input } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useNavigate } from 'hooks/UseRouter'
import { useAuth } from 'Contexts/Auth'
import { ApiErrorResponse } from 'services/api'
import Link from 'next/link'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
  handleChangeForm: (name: string, value: string) => void
  phoneNumber: string
}

const Step1: React.FC<Props> = ({ onChangeStep, handleChangeForm, phoneNumber }): React.ReactElement => {
  const { navigateTo } = useNavigate()
  const { sendCode } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      await sendCode(phoneNumber)
      onChangeStep('step2')
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
        <div className="flex mt-[28px] x:mt-0 flex-col gap-[12px] mb-[28px] x:mb-[51px]">
          <Typography className="text-primary-brand tracking-[1.5px] leading-normal text-[18px] font-medium uppercase hidden x:block">
            Move Your Way
          </Typography>
          <Typography variant="heading7" className="text-center x:text-left">
            Login or Signup
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <Input
                focus
                placeholder="Enter Phone Number"
                name="firstName"
                value={phoneNumber}
                onChange={(e) => handleChangeForm('phoneNumber', e.target.value)}
                className="rounded-[22px] py-[2px] px-3 bg-border-grey"
              />

              <Button
                color="success"
                className="bg-secondary-light-blue shadow-buttonShadow3"
                textClassName="text-white"
                variant="fill"
                onClick={handleLogin}
                loading={loading}
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </form>
          <div className="flex justify-between items-center">
            <div className="w-[40%] h-[1px] bg-[#f5f7f9]" />
            <Typography className="text-primary-grey">or</Typography>
            <div className="w-[40%] h-[1px] bg-[#f5f7f9]" />
          </div>
          <div className="flex flex-col gap-2.5 x:gap-4">
            <Typography className="ml-[7px] text-[16px] font-semibold">Don’t have an account?</Typography>
            <Button onClick={() => navigateTo('/signup')} className="bg-[#e3f2f7]" variant="landingButton">
              Sign Up
            </Button>
          </div>
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
