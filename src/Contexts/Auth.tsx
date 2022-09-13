/* eslint-disable */
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { authState } from 'rxfire/auth'
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
  verifyCode?: (phoneNumber: string, token: number) => Promise<VerifyLoginResp>
}

const AuthContext = createContext<AuthState>({} as AuthState)

declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser>(null)
  const [ready, setReady] = useState<boolean>(false)

  const checkUser = async () => {
    const token = getToken()
    if (token) {
      try {
        const account = await AuthService.getAccount()
        setUser(account)
      } catch (e) {
        console.log("pzda i am here")
        remToken()
      }
    }
    setReady(true)
  }

  const updateUser = (arg: IUser) => {
    setUser(arg)
  }

  useEffect(() => {
    checkUser()
  }, [])

  const sendCode = async (phoneNumber: string) =>
    await AuthService.login({
      phoneNumber,
    })

  const verifyCode = async (phoneNumber: string, token: number) =>
    await AuthService.verifyLogin({
      phoneNumber: phoneNumber,
      token: token,
    })

  return (
    <AuthContext.Provider value={{ sendCode, ready, verifyCode, user, updateUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth: () => AuthState = () => useContext<AuthState>(AuthContext)
