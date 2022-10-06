import { IUser } from './types'
import rest from './api'

type UpdateUserParams = Partial<IUser> & { jwttoken: string }

const Service = {
  updateAccount: (body: UpdateUserParams) =>
    rest.put<IUser>('auth/me', {
      body,
      jwttoken: body.jwttoken,
    }),
}

export default Service
