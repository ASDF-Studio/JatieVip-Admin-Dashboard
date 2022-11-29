import { IUser } from './types'
import rest from './api'

export const authTokenKey = 'jwt_token'

export interface LoginParameter {
  phoneNumber: string
  userIp: string
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
  isLoggedIn: boolean
}

const Service = {
  login: (body: LoginParameter) =>
    rest.post('auth/login', {
      body,
      headers: {
        'users-ip': body.userIp,
      },
    }),
  verifyLogin: (body: VerifyLoginParams) =>
    rest.post<VerifyLoginResp>('auth/verify-login', {
      body,
    }),
  getAccount: ({ token }: { token: string }) =>
    rest.get<IUser>('auth/me', {
      jwttoken: token,
    }),
}

export default Service
