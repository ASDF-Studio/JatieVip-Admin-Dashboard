import { IUser } from './types'
import rest from './api'

type UpdateUserParams = Partial<IUser> & { jwttoken: string }

type BanUserParams = {
  userId: string
}

type GetAllBannedUserParams = {}

const Service = {
  updateAccount: (body: UpdateUserParams) =>
    rest.put<IUser>('auth/me', {
      body,
      jwttoken: body.jwttoken,
    }),

  banUser: (body: BanUserParams) => {
    return rest.post('user/ban_user', {
      body,
    })
  },
  unBanUser: (body: BanUserParams) => {
    return rest.post('user/ban_user', {
      body,
    })
  },
  getAllBannedUser: (body: GetAllBannedUserParams) => {
    return rest.post('user/ban_user', {
      body,
    })
  },
}

export default Service
