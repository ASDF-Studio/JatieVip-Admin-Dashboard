import { Button, VerifyCodeInput } from 'components'
import React, { Dispatch, useState } from 'react'
import { Typography } from '@mui/material'
import { SignUpSteps } from 'types'

type Props = {
  onChangeStep: Dispatch<SignUpSteps>
}

const Step2: React.FC<Props> = ({ onChangeStep }): React.ReactElement => {
  const [code, setCode] = useState<string>('')

  return (
    <div className="flex justify-center pt-[203px]">
      <div className="w-[400px] flex flex-col justify-center gap-[43px]">
        <Typography className="text-center" variant="heading1">
          Finish Sign Up
        </Typography>
        <div className="flex flex-col gap-4">
          <Typography variant="body2">Verification Code</Typography>
          <div className="flex flex-col">
            <Typography className="text-primary-grey" variant="body2">
              Please enter the verification code
            </Typography>
            <div className="flex">
              <Typography className="text-primary-grey" variant="body2">
                that was sent to <span className="text-primary-black">&nbsp;{`${'+976 99032894'}`}</span>
              </Typography>
              <Button onClick={() => onChangeStep('step1')} variant="text" className="p-0 transform-none">
                <Typography variant="body2" className=" text-primary-brand">
                  Edit
                </Typography>
              </Button>
            </div>
          </div>
          <VerifyCodeInput length={6} code={code} onChange={(cd) => setCode(cd)} />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => onChangeStep('step3')}
            className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow"
            variant="fill"
          >
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
