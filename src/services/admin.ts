import { IUser } from './types'
import rest from './api'
import { keys, values } from 'lodash'

type UpdateUserParams = Partial<IUser> & { jwttoken?: string; filePath?: any }

type BanUserParams = {
  userId: string
}

type GetAllBannedUserParams = {}

type GetAllUsers = {
  offset: number
}

type SearchParams = {
  searchWord: string
  loggedInUserId: string
}

const Service = {
  searchUser: (body: SearchParams) => {
    return rest.post<{
      data: IUser[]
    }>('/user/search', {
      body,
    })
  },
  updateAccount: (body: UpdateUserParams) => {
    const formData = new FormData()
    const bodyKey = keys(body)

    bodyKey.forEach((key) => {
      if (key === 'filePath' && body[key]) {
        formData.append('myimage', body[key], body[key].name)
      } else {
        formData.append(key, body[key])
      }
    })

    return rest.post<IUser>('auth/updateuser', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // jwttoken: body.jwttoken,
    })
  },

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
    return rest.post('user/unban_user', {
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
