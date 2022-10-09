import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import { Step1, Step2 } from 'ui/login'
import { LoginSteps } from 'types'
import { LoginSideBar } from 'components/loginSideBar'
import { MainLayout } from 'components'

import { useFormik } from 'formik'
import { AuthProvider } from 'Contexts/Auth'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { loginSchema } from 'utils/schema'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'

const Home: NextPage = (): React.ReactElement => {
  const router = useRouter()
  const [step, setStep] = useState<LoginSteps>('step1')
  const [showError, setShowError] = useState(false)

  const verifyCode = async (phoneNumber: string, token: number) => {
    await axios.post('/api/login', {
      phoneNumber,
      token,
    })
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      code: '',
    },
    validationSchema: loginSchema,
    onSubmit: async ({ phoneNumber, code }) => {
      setShowError(false)
      try {
        await verifyCode(phoneNumber, Number(code))
        router.replace('/dashboard')
      } catch (e) {
        if (e instanceof AxiosError) {
          setShowError(true)
        }
      }
    },
  })

  const { setFieldTouched, setFieldValue } = formik

  const { phoneNumber, code } = formik.values

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFieldTouched(name, true, true)
    formik.setFieldValue(name, value)
  }

  const handleChangeStep = (step: LoginSteps) => setStep(step)

  const getStepsUI = (step: LoginSteps) => {
    switch (step) {
      case 'step1':
        return <Step1 phoneNumber={phoneNumber} handleChangeForm={handleInputChange} onChangeStep={handleChangeStep} />
      default:
        return (
          <Step2
            error={showError}
            sumbitForm={formik.submitForm}
            handleChangeForm={setFieldValue}
            code={code}
            phoneNumber={phoneNumber}
            onChangeStep={handleChangeStep}
          />
        )
    }
  }

  return (
    <AuthProvider>
      <MainLayout hiddenDesktop stickyFooter withNavBar={false}>
        <div className="flex justify-between mt-[66px] x:mt-0">
          <LoginSideBar className="w-[72%] hidden x:block" />

          {getStepsUI(step)}
        </div>
      </MainLayout>
    </AuthProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { token } = req.session

  if (token) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}, sessionOptions)

export default Home
