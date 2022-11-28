/* eslint-disable */
import axios, { AxiosResponse } from 'axios'
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { VerifyLoginResp } from 'services/auth'
import { IUser } from 'services/types'

export interface AuthState {
  user?: IUser
  setUser?: React.Dispatch<React.SetStateAction<IUser>>
  sendCode: (phoneNumber: string, captcha: string) => Promise<unknown>
  updateUser?: (value: IUser) => void
  logOut?: () => void
  ready?: boolean
  verifyCode?: (phoneNumber: string, token: number) => Promise<AxiosResponse<VerifyLoginResp>>
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

  const updateUser = (arg: IUser) => {
    setUser(arg)
  }

  const sendCode = async (phoneNumber: string, captcha: string) => {
    await axios.post('/api/sendVerify', {
      phoneNumber,
      captcha,
    })
  }

  return <AuthContext.Provider value={{ sendCode, ready, user, updateUser }}>{children}</AuthContext.Provider>
}

export const useAuth: () => AuthState = () => useContext<AuthState>(AuthContext)
