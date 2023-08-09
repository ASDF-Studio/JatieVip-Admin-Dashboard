import type { GetServerSideProps, NextPage } from 'next'
import React, { useLayoutEffect, useState } from 'react'
import { Step1, Step2 } from 'ui/login'
import { LoginSteps } from 'types'
import { LoginSideBar } from 'components/loginSideBar'
import { MainLayout } from 'components'
import { useFormik } from 'formik'
import { AuthProvider, useAuth } from 'Contexts/Auth'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { loginSchema } from 'utils/schema'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import Head from 'next/head'
import { useUser } from 'hooks/useUser'

const Home: NextPage = (): React.ReactElement => {
  const router = useRouter()
  const [step, setStep] = useState<LoginSteps>('step1')
  const [showError, setShowError] = useState(false)
  const { verifyCode, user } = useAuth()

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
        router.replace('/')
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

  if (user) {
    router.push("/")
    return <h1>redirecting to home</h1>
  }

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
            setError={setShowError}
            onChangeStep={handleChangeStep}
          />
        )
    }
  }

  return (
    <>
      <Head>
        <title>Movefit Login</title>
      </Head>
      <MainLayout hiddenDesktop stickyFooter withNavBar={false}>
        <div className="flex justify-between mt-[66px] x:mt-0">
          <LoginSideBar className="w-[72%] hidden x:block" />

          {getStepsUI(step)}
        </div>
      </MainLayout>
    </>
  )
}

export default Home
