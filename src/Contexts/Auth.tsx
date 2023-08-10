/* eslint-disable */
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, FC, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { async } from 'rxjs'
import { AuthService } from 'services'
import { VerifyLoginResp } from 'services/auth'
import { IUser } from 'services/types'

export interface AuthState {
  user?: IUser
  setUser?: React.Dispatch<React.SetStateAction<IUser>>
  sendCode: (phoneNumber: string) => Promise<unknown>
  updateUser?: (value: IUser) => void
  logOut?: () => void
  ready?: boolean
  verifyCode?: (phoneNumber: string, otp: number) => Promise<unknown>
}

const AuthContext = createContext<AuthState>({} as AuthState)

declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

export const AuthProvider: FC<{ children: React.ReactNode; userContext?: IUser }> = ({ children, userContext }) => {
  const [user, setUser] = useState<IUser>(userContext)
  const [ready, setReady] = useState<boolean>(false)
  const { push } = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    } else {
      push('/login')
    }
  }, [])

  const logOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (arg: IUser) => {
    setUser(arg)
  }

  const sendCode = (phoneNumber: string) => {
    return AuthService.login({
      phoneNumber: `+${phoneNumber}`,
    })
  }

  const verifyCode = async (phoneNumber: string, otp: number) => {
    const res = await AuthService.verifyLogin({
      phoneNumber,
      otp,
    })
    setUser(res)
    localStorage.setItem('user', JSON.stringify(res))
  }

  return (
    <AuthContext.Provider value={{ sendCode, ready, user, updateUser, verifyCode, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth: () => AuthState = () => useContext<AuthState>(AuthContext)
