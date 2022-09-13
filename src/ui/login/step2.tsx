import { Button, VerifyCodeInput } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useAuth } from 'Contexts/Auth'
import { setToken } from 'services/api'
import { useNavigate } from 'hooks/UseRouter'
import { AuthService } from 'services'

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
    <div className="flex justify-center pt-[203px]">
      <div className="w-[400px] flex flex-col justify-center gap-[43px]">
        <Typography className="text-center" variant="heading1">
          Verify Login
        </Typography>
        <div className="flex flex-col gap-4">
          <Typography variant="body2">Verification Code</Typography>
          <div className="flex flex-col">
            <Typography className="text-primary-grey" variant="body2">
              Please enter the verification code
            </Typography>
            <div className="flex">
              <Typography className="text-primary-grey" variant="body2">
                that was sent to <span className="text-primary-black">&nbsp;{`${phoneNumber}`}</span>
              </Typography>
              <Button variant="text" className="p-0 transform-none" onClick={() => onChangeStep('step1')}>
                <Typography variant="body2" className=" text-primary-brand">
                  Edit
                </Typography>
              </Button>
            </div>
          </div>
          <VerifyCodeInput length={5} code={code} onChange={(cd) => setCode(cd)} />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleVerify}
            disabled={code.length !== 5 || loading}
            loading={loading}
            className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow"
            variant="fill"
          >
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Verify
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step2
