/* eslint-disable */
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import {User, signOut, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult} from 'firebase/auth'
import {auth } from 'firebaseClient'
import {IUser} from 'types'
import { authState} from 'rxfire/auth'

export interface AuthState {
    user?: IUser
    setUser?: React.Dispatch<React.SetStateAction<IUser>>
    sendCode: (phoneNumber: string) => Promise<void>
    updateUser?: (value: IUser) => void
    logOut?: () => void
    ready?: boolean
    confirmationResult: ConfirmationResult
}

const AuthContext = createContext<AuthState>({} as AuthState)

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
  }

export const AuthProvider:FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<IUser>(null)
    const [ready, setReady] = useState<boolean>(false)
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>(null)

    const value = React.useMemo(() => [user, setUser], [user])

    useEffect(() => {
        const sub = authState(auth).subscribe(user => {
            setReady(true)
            console.log(user)
        })

        return () => sub.unsubscribe()
    }, [])

    const sendCode = async (phoneNumber: string) => {
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            setConfirmationResult(confirmationResult)
        } catch(e) {
            window.recaptchaVerifier.clear()
        }
    }

    
    return <AuthContext.Provider value={{sendCode, confirmationResult, ready}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth: () => AuthState = () => useContext<AuthState>(AuthContext)    