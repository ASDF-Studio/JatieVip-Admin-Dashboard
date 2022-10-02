import { Button, VerifyCodeInput } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useAuth } from 'Contexts/Auth'
import { setToken } from 'services/api'
import { useNavigate } from 'hooks/UseRouter'
import { AuthService } from 'services'
import Link from 'next/link'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
  phoneNumber: string
}

const Step2: React.FC<Props> = ({ onChangeStep, phoneNumber }): React.ReactElement => {
  const { verifyCode, updateUser } = useAuth()
  const { navigateTo } = useNavigate()
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleVerify = () => {
    try {
      setLoading(true)
      verifyCode(phoneNumber, Number(code)).then(async ({ token }) => {
        setToken(token)
        const account = await AuthService.getAccount()
        updateUser(account)
        await navigateTo('/account')
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-[520px] mx-auto px-[26px] x:h-screen overflow-y-auto x:gap-[222px]  x:px-[28px] w-full flex-col x:justify-between pb-[28px] relative">
      <div />
      <div className="w-full x:w-[447px] mx-auto flex-col mt-[36px] x:mt-0">
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
                  that was sent to {`${phoneNumber}`}&nbsp;&nbsp;
                </Typography>
                <span onClick={() => onChangeStep('step1')} className="hover:cursor-pointer">
                  <Typography variant="body2" className=" text-primary-brand font-semibold">
                    Edit
                  </Typography>
                </span>
              </div>
            </div>
          </div>
          <VerifyCodeInput length={5} code={code} onChange={(cd) => setCode(cd)} />
        </div>
        <div className="flex flex-col mt-5">
          <Button
            onClick={handleVerify}
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

export default Step2
