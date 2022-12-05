/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-curly-brace-presence */
import { Button } from 'components'
import React, { Dispatch, useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { isEmpty } from 'lodash'
import { useAuth } from 'Contexts/Auth'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { AxiosError } from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
  handleChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void
  phoneNumber: string
}

const Step1: React.FC<Props> = ({ onChangeStep, handleChangeForm, phoneNumber }): React.ReactElement => {
  const [error, setError] = useState<string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { sendCode } = useAuth()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleLogin = (e) => {
    e.preventDefault()

    if (isEmpty(phoneNumber)) {
      setError('Phone number is required')

      return
    }

    recaptchaRef.current.execute()
  }

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return
    }

    try {
      setLoading(true)
      await sendCode(`+${phoneNumber}`, captchaCode)
      onChangeStep('step2')
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response.data.message)
      }
    } finally {
      recaptchaRef.current.reset()
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-[520px] mx-auto px-[26px] h-[calc(100vh-67px)] x:h-screen overflow-y-auto x:gap-[100px]  x:px-[28px] w-full flex-col x:justify-between pb-[28px] relative">
      <div />
      <div className="w-full x:max-w-[447px]  mx-auto flex-col">
        <div className="flex mt-[28px] x:mt-0 flex-col gap-[12px] mb-[28px] x:mb-[51px]">
          <Typography className="text-primary-brand tracking-[1.5px] leading-normal text-[18px] font-medium uppercase hidden x:block">
            Move Your Way
          </Typography>
          <Typography variant="heading7" className="text-center x:text-left">
            Login or Signup
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={(e) => handleLogin(e)}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
            />
            <div className="flex flex-col gap-4">
              <PhoneInput
                country={'us'}
                value={phoneNumber}
                specialLabel=""
                onEnterKeyPress={(e) => handleLogin(e)}
                placeholder="Enter Phone Number"
                inputStyle={{
                  fontFamily: 'Avenir Next',
                }}
                dropdownStyle={{
                  fontFamily: 'Avenir Next',
                }}
                autoFormat={false}
                onChange={(phone) => {
                  setError(null)
                  handleChangeForm({
                    target: {
                      name: 'phoneNumber',
                      value: phone,
                    },
                  })
                }}
                searchClass="bg-black font-medium"
                dropdownClass="text-[14px]"
                inputClass="rounded-[22px] py-[9px]  bg-border-grey text-[14px] w-full font-medium hover:border-primary-transparent bg-border-grey focus:border-primary-transparent border-primary-transparent focus:shadow-none"
              />

              {error && (
                <Typography className="text-text-error font-medium" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                color="success"
                type="submit"
                className="bg-secondary-light-blue shadow-buttonShadow3"
                textClassName="text-white"
                variant="fill"
                onClick={handleLogin}
                loading={loading}
                disabled={loading}
              >
                Continue
              </Button>
            </div>
          </form>
          {/* <div className="flex justify-between items-center">
            <div className="w-[40%] h-[1px] bg-[#f5f7f9]" />
            <Typography className="text-primary-grey">or</Typography>
            <div className="w-[40%] h-[1px] bg-[#f5f7f9]" />
          </div> */}
          {/* <div className="flex flex-col gap-2.5 x:gap-4">
            <Typography className="ml-[7px] text-[16px] font-semibold">Don’t have an account?</Typography>
            <Button onClick={() => navigateTo('/signup')} className="bg-[#e3f2f7]" variant="landingButton">
              Sign Up
            </Button>
          </div> */}
        </div>
      </div>

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

export default Step1
