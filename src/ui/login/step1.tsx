import { Button, Input } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useNavigate } from 'hooks/UseRouter'
import { useAuth } from 'Contexts/Auth'
import { ApiErrorResponse } from 'services/api'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
  handleChangeForm: (name: string, value:string) => void
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
        onChangeStep("step2")
      } catch(e) {
        if (e instanceof ApiErrorResponse) {
            console.log(e)
        }
        
      } finally {
        setLoading(false)
      }
  }

  return (
    <div className="flex justify-center pt-[203px]">
      <div className="w-[400px] flex flex-col justify-center gap-[43px]">
        <Typography className="text-center" variant="heading1">
          Welcome!
        </Typography>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => handleChangeForm("phoneNumber", e.target.value)} />
          <Button
            color="success"
            className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow"
            variant="fill"
            onClick={handleLogin}
            loading={loading}
            disabled={loading}
          >
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Login
            </Typography>
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[40%] h-[1px] bg-primary-transparent" />
          <Typography className="text-primary-grey">or</Typography>
          <div className="w-[40%] h-[1px] bg-primary-transparent" />
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="text-primary-black" variant="body">
            Don’t have an account?
          </Typography>
          <Button onClick={() => navigateTo('signup')} className="bg-fill-orange rounded-[22px]" variant="fill">
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Sign Up
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step1
