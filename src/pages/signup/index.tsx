/* eslint-disable padding-line-between-statements */
import type { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import React, { useState } from 'react'
import { Step3, Step4 } from 'ui/signup'
import { SignUpSteps } from 'types'
import { LoginSideBar } from 'components/loginSideBar'
import { sessionOptions } from 'lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { IUser } from 'services/types'
import { AuthProvider } from 'Contexts/Auth'
import { AuthService } from 'services'
import { ApiErrorResponse } from 'services/api'
import Head from 'next/head'

const SignUp: NextPage = ({ user }: { user: IUser }): React.ReactElement => {
  const getStateDefault = (): SignUpSteps => {
    if (!user?.username) {
      return 'step1'
    }

    return 'step2'
  }

  const [state, setState] = useState<SignUpSteps>(getStateDefault())

  const handleChangeStep = (step: SignUpSteps) => setState(step)

  const getStepsUI = (step: SignUpSteps) => {
    switch (step) {
      case 'step1':
        return <Step3 onChangeStep={handleChangeStep} />
      case 'step2':
        return <Step4 />
      default:
        return <div>Loading</div>
    }
  }

  return (
    <AuthProvider userContext={user}>
      <Head>
        <title>Movefit signup</title>
      </Head>
      <MainLayout hiddenDesktop stickyFooter={state !== 'step2'} withNavBar={false}>
        <div className="flex justify-between mt-[66px] x:mt-0">
          <LoginSideBar className="w-[72%] hidden x:block" />

          {getStepsUI(state)}
        </div>
      </MainLayout>
    </AuthProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { token, user } = req.session

  if (!token || !user) {
    req.session.destroy()

    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  try {
    const user = await AuthService.getAccount({ token })
    delete user.myPreference
    delete user.userGoals

    delete user.enrolledPrograms

    req.session.user = user
    await req.session.save()
  } catch (e) {
    if (e instanceof ApiErrorResponse) {
      if (e.statusCode === 401) {
        req.session.destroy()
        return {
          props: {},
          redirect: {
            destination: '/login',
            permanent: true,
          },
        }
      }
      return {
        props: {},
        redirect: {
          destination: '/500',
          permanent: true,
        },
      }
    }
    return {
      props: {},
      redirect: {
        destination: '/500',
        permanent: true,
      },
    }
  }

  if (user?.username && user?.last_name && user?.first_name && user?.date_of_birth && user?.gender) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}, sessionOptions)

export default SignUp
