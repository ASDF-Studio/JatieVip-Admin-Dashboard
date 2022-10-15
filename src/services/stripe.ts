import axios, { AxiosError } from 'axios'
import { StripeError } from 'lib/error'

const AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const StripeService = {
  createSession: async (body): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/createSession', {
        ...body,
      })

      return stripeSesion.data.data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new StripeError(e.response.data.message, { statusCode: e.response.status })
      } else {
        throw new Error(e.message)
      }
    }
  },

  getUserSubs: async (): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/getUserSub', {})

      return stripeSesion.data.data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new StripeError(e.response.data.message, { statusCode: e.response.status })
      } else {
        throw new Error(e.message)
      }
    }
  },
  createScheduleSub: async (body: { selectedProduct: string }): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/createSchedules', {
        ...body,
      })

      return stripeSesion.data.data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new StripeError(e.response.data.message, { statusCode: e.response.status })
      } else {
        throw new Error(e.message)
      }
    }
  },
  updateCurrentSub: async (body: { endAtThePeriod: boolean }): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/updateSubs', {
        ...body,
      })

      return stripeSesion.data.data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new StripeError(e.response.data.message, { statusCode: e.response.status })
      } else {
        throw new Error(e.message)
      }
    }
  },
}
