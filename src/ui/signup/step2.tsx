import { Button, VerifyCodeInput } from 'components'
import React, { useState } from 'react'
import { Typography } from '@mui/material'

const Step2: React.FC = (): React.ReactElement => {
  const [code, setCode] = useState<string>('')

  return (
    <div className="flex justify-center items-center min-h-screen">
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
                that was sent to <span className="text-primary-black">&nbsp;{`${'+976 99032894'}`}</span>
              </Typography>
              <Button variant="text" className="p-0 transform-none">
                <Typography variant="body2" className=" text-primary-brand">
                  Edit
                </Typography>
              </Button>
            </div>
          </div>
          <VerifyCodeInput length={6} code={code} onChange={(cd) => setCode(cd)} />
        </div>
        <div className="flex flex-col gap-4">
          <Button className="bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow" variant="fill">
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
