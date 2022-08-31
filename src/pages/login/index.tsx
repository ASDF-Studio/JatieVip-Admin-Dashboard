import type { NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useState } from 'react'
import { Step1, Step2 } from 'ui/login'
import { LoginSteps } from 'types'

const Home: NextPage = (): React.ReactElement => {
  const [step, setStep] = useState<LoginSteps>('step1')

  const handleChangeStep = (step: LoginSteps) => setStep(step)

  const getStepsUI = (step: LoginSteps) => {
    switch (step) {
      case 'step1':
        return <Step1 onChangeStep={handleChangeStep} />
      default:
        return <Step2 onChangeStep={handleChangeStep} />
    }
  }

  return (
    <MainLayout withNavBar={false} footer={false}>
      {getStepsUI(step)}
    </MainLayout>
  )
}

export default Home
