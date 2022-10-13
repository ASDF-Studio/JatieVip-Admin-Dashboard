import axios, { AxiosError } from 'axios'
import { IProductNames } from './types'

const AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const StripeService = {
  createSession: async (body: CreateSessionParams): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/createSession', {
        ...body,
      })

      return stripeSesion.data.session
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response.data.message)
      } else {
        throw new Error(e.message)
      }
    }
  },

  getUserSubs: async (): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/getUserSub', {})

      return stripeSesion.data.subs
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response.data.message)
      } else {
        throw new Error(e.message)
      }
    }
  },
}
