import type { NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useState } from 'react'
import { Step1, Step2, Step3, Step4 } from 'ui/signup'
import { LoginSteps, SignUpSteps } from 'types'
import { LoginSideBar } from 'components/loginSideBar'

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
      case 'step4':
        return <Step4 onChangeStep={handleChangeStep} />
      default:
        return <Step2 />
    }
  }

  return (
    <MainLayout hiddenDesktop stickyFooter={step !== 'step4'} withNavBar={false}>
      <div className="flex justify-between mt-[66px] x:mt-0">
        <LoginSideBar className="w-[72%] hidden x:block" />

        {getStepsUI(step)}
      </div>
    </MainLayout>
  )
}

export default Home
