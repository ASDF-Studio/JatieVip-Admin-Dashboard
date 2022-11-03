import rest from './api'

export const authTokenKey = 'jwt_token'

export type CreateSubsTypes = 'month' | '3months' | '6months' | 'year'

export type CreateSubsParams = {
  user_id: number
  valid_from: string
  valid_to: string
  type: CreateSubsTypes
  secret_key: string
}

export type DeleteSubParams = {
  userId: number
  secret_key: string
}

const Service = {
  createSubs: (body: CreateSubsParams) =>
    rest.post('/subscriptions/by-web', {
      body,
    }),
  deleteSubs: (body: DeleteSubParams) =>
    rest.del(`/subscriptions/by-web/${body.userId}`, {
      body: {
        secret_key: body.secret_key,
      },
    }),
}

export default Service
