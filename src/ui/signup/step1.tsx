import { Button, Input } from 'components'
import React, { Dispatch } from 'react'
import { Typography } from '@mui/material'
import { LoginSteps } from 'types'
import { useNavigate } from 'hooks/UseRouter'

type Props = {
  onChangeStep: Dispatch<LoginSteps>
}

const Step1: React.FC<Props> = ({ onChangeStep }): React.ReactElement => {
  const { navigateTo } = useNavigate()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px] flex flex-col justify-center gap-[43px]">
        <Typography className="text-center" variant="heading1">
          Sign Up
        </Typography>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter Phone Number" />
          <Button
            color="success"
            className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow"
            variant="fill"
            onClick={() => onChangeStep('step2')}
          >
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Sign Up
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
            Already have an account?
          </Typography>
          <Button onClick={() => navigateTo('/login')} className="bg-fill-orange rounded-[22px]" variant="fill">
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Login
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step1
