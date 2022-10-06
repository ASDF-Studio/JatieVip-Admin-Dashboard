import type { NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useEffect, useState } from 'react'
import { Step3, Step4 } from 'ui/signup'
import { SignUpSteps } from 'types'
import { LoginSideBar } from 'components/loginSideBar'
import { useAuth } from 'Contexts/Auth'

const Home: NextPage = (): React.ReactElement => {
  const { user } = useAuth()
  const [state, setState] = useState<SignUpSteps>('step1')

  useEffect(() => {
    if (user?.username === 'test') {
      setState('step1')
    }
    if (user?.last_name === 'Test Last Name') {
      setState('step2')
    }
  }, [user])

  const handleChangeStep = (step: SignUpSteps) => setState(step)

  const getStepsUI = (step: SignUpSteps) => {
    switch (step) {
      case 'step1':
        return <Step3 onChangeStep={handleChangeStep} />
      case 'step2':
        return <Step4 onChangeStep={handleChangeStep} />
      default:
        return <div>Loading</div>
    }
  }

  return (
    <MainLayout hiddenDesktop stickyFooter={state !== 'step2'} withNavBar={false}>
      <div className="flex justify-between mt-[66px] x:mt-0">
        <LoginSideBar className="w-[72%] hidden x:block" />

        {getStepsUI(state)}
      </div>
    </MainLayout>
  )
}

export default Home
