import { Button, Input } from 'components'
import React, { Dispatch } from 'react'
import { Typography } from '@mui/material'
import { SignUpSteps } from 'types'

type Props = {
  onChangeStep: Dispatch<SignUpSteps>
}

const Step2: React.FC<Props> = ({ onChangeStep }): React.ReactElement => {
  return (
    <div className="flex justify-center pt-[203px]">
      <div className="w-[400px] flex flex-col justify-center gap-[43px]">
        <Typography className="text-center" variant="heading1">
          Setup your Username
        </Typography>
        <div className="flex flex-col gap-4">
          <Input placeholder="@Username" />

          <div className="flex">
            <Typography className="text-primary-grey" variant="body2">
              By continuing you accept our<span className="underline hover:cursor-pointer">&nbsp;Privacy Policy</span>
              &nbsp;and <span className="underline hover:cursor-pointer">&nbsp;Terms of Use</span>
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow" variant="fill">
            <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
              Next
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step2
