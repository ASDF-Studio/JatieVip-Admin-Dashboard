import { IUser } from './types'
import rest from './api'

type UpdateUserParams = Partial<IUser> & { jwttoken: string }

type BanUserParams = {
  userId: string
}

type GetAllBannedUserParams = {}

type GetAllUsers = {
  offset: number
}

const Service = {
  updateAccount: (body: UpdateUserParams) =>
    rest.put<IUser>('auth/me', {
      body,
      jwttoken: body.jwttoken,
    }),

  getUsers: (body: GetAllUsers) =>
    rest.post<{
      data: {
        count: number
        users: IUser[]
      }
    }>('user/get_all_users', {
      body,
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
