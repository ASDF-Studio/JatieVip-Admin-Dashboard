import axios from 'axios'
import { IProductNames } from './types'

const AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

type CreateSessionParams = {
  selectedProduct: IProductNames
}

export const StripeService = {
  createSession: async (body: CreateSessionParams): Promise<any> => {
    try {
      const stripeSesion = await AxiosInstance.post('/api/stripe/createSession', {
        ...body,
      })

      return stripeSesion.data.session
    } catch (e) {
      throw new Error(e)
    }
  },
}
