/* eslint-disable */
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'hooks/UseRouter'
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { AuthService } from 'services'
import { getToken, remToken } from 'services/api'
import { VerifyLoginResp } from 'services/auth'
import { IUser } from 'services/types'

export interface AuthState {
  user?: IUser
  setUser?: React.Dispatch<React.SetStateAction<IUser>>
  sendCode: (phoneNumber: string) => Promise<unknown>
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

export const AuthProvider: FC<{ children: React.ReactNode; userContext: IUser }> = ({ children, userContext }) => {
  const [user, setUser] = useState<IUser>(userContext)
  const [ready, setReady] = useState<boolean>(false)
  

  const updateUser = (arg: IUser) => {
    setUser(arg)
  }

  const sendCode = async (phoneNumber: string) =>
    await AuthService.login({
      phoneNumber,
    })

  const verifyCode = async (phoneNumber: string, token: number) => {
    await axios.post('/api/login', {
      phoneNumber,
      token,
    })
  }

  return (
    <AuthContext.Provider value={{ sendCode, ready, verifyCode, user, updateUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth: () => AuthState = () => useContext<AuthState>(AuthContext)
