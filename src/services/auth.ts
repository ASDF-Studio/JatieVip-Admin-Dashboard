import rest from './api'

export const authTokenKey = 'jwt_token'
export const ardTokenKey = 'ard_token'

export interface LoginParameter {
  address: string
  signature: string
}

export interface AuthResponse {
  jwtToken: string
}

const Service = {
  login: (body: LoginParameter) =>
    rest.post<AuthResponse>('auth/login', {
      body,
    }),
  checkAccount: () =>
    rest.post<unknown>('auth/check', {
      hasAuth: true,
    }),
}

export default Service
