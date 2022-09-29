import { IUser } from './types'
import rest from './api'


export const authTokenKey = 'jwt_token'

export interface LoginParameter {
  phoneNumber: string
}

export interface LoginResponse {
  jwtToken: string
}

export interface VerifyLoginParams {
  phoneNumber: string
  token: number
}

export interface VerifyLoginResp {
  token: string
}

const Service = {
  login: (body: LoginParameter) =>
    rest.post('/api/auth/login', {
      body,
    }),
  verifyLogin:(body: VerifyLoginParams) =>
    rest.post<VerifyLoginResp>('/api/auth/verify-login', {
      body
    }),
  getAccount: () => rest.get<IUser>('/api/auth/me', {
    hasAuth: true
  })
}

export default Service
