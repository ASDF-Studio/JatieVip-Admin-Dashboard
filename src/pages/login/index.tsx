import type { NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useState } from 'react'
import { Step1, Step2 } from 'ui/login'
import { LoginSteps } from 'types'
import { useAuth } from 'Contexts/Auth'
import { useNavigate } from 'hooks/UseRouter'

type FormValues = {
  phoneNumber: string
  code: string
}

const Home: NextPage = (): React.ReactElement => {
  const { user } = useAuth()
  const { navigateTo } = useNavigate()
  const [step, setStep] = useState<LoginSteps>('step1')
  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: '',
    code: '',
  })

  if (user) {
    navigateTo('/account')
  }

  const handleChangeForm = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value })
  }

  const handleChangeStep = (step: LoginSteps) => setStep(step)

  const getStepsUI = (step: LoginSteps) => {
    switch (step) {
      case 'step1':
        return (
          <Step1
            phoneNumber={formValues.phoneNumber}
            handleChangeForm={handleChangeForm}
            onChangeStep={handleChangeStep}
          />
        )
      default:
        return <Step2 phoneNumber={formValues.phoneNumber} onChangeStep={handleChangeStep} />
    }
  }

  return (
    <MainLayout withNavBar={false} footer={false}>
      {getStepsUI(step)}
    </MainLayout>
  )
}

export default Home
