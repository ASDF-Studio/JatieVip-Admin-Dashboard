import type { NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useState } from 'react'
import { Step1, Step2, Step3 } from 'ui/signup'
import { LoginSteps, SignUpSteps } from 'types'

const Home: NextPage = (): React.ReactElement => {
  const [step, setStep] = useState<SignUpSteps>('step1')

  const handleChangeStep = (step: LoginSteps) => setStep(step)

  const getStepsUI = (step: SignUpSteps) => {
    switch (step) {
      case 'step1':
        return <Step1 onChangeStep={handleChangeStep} />
      case 'step2':
        return <Step2 onChangeStep={handleChangeStep} />
      case 'step3':
        return <Step3 onChangeStep={handleChangeStep} />
      default:
        return <Step2 />
    }
  }

  return (
    <MainLayout withNavBar={false} footer={false}>
      {getStepsUI(step)}
    </MainLayout>
  )
}

export default Home
