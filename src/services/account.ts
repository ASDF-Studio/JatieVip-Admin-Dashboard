import { IUser } from './types'
import rest from './api'

type UpdateUserParams = Partial<IUser>

const Service = {
  updateAccount: (body: UpdateUserParams) =>
    rest.put<IUser>('auth/me', {
      body,
      hasAuth: true,
    }),
}

export default Service
