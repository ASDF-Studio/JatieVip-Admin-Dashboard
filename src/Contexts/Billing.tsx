/* eslint-disable */
import axios, { AxiosResponse } from 'axios'
import { StripeError } from 'lib/error'
import { useRouter } from 'next/router'
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { StripeService } from 'services/stripe'
import { ISub } from 'services/types'
import { useAuth } from './Auth'

export interface BillingState {
  currentSubs: ISub
  loading: boolean
}

const BillingContext = createContext<BillingState>({} as BillingState)

export const BillingProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSubs, setCurrentSubs] = useState<ISub>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    fetchCurrentSubs()
  }, [])

  const fetchCurrentSubs = async () => {
    setLoading(true)
    try {
      const curSubs = await StripeService.getUserSubs()
      setCurrentSubs(curSubs)
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return <BillingContext.Provider value={{ loading, currentSubs }}>{children}</BillingContext.Provider>
}

export const useBilling: () => BillingState = () => useContext<BillingState>(BillingContext)
