import { SubsService } from 'services'
import { ApiErrorResponse } from 'services/api'
import { CreateSubsTypes } from 'services/subs'

type DeleteUserSubType = {
  moveUserId: number
}

export const deleteUserSubsOnApp = async ({ moveUserId }: DeleteUserSubType): Promise<boolean> => {
  try {
    await SubsService.deleteSubs({
      userId: moveUserId,
      secret_key: process.env.BACK_END_SECRET_KEY || '',
    })
    console.log('succesfully deleted subscription for: ', moveUserId)

    return true
  } catch (e) {
    if (e instanceof ApiErrorResponse) {
      console.log('cannot delete -->', e.message)
    }

    return false
  }
}

type CreateUserSub = {
  user_id: number
  valid_from: string
  valid_to: string
  type: CreateSubsTypes
}

export const createUserSubOnApp = async (params: CreateUserSub) => {
  try {
    await SubsService.createSubs({
      ...params,
      secret_key: process.env.BACK_END_SECRET_KEY || '',
    })
    console.log('succesfully updated subscription for: ', params.user_id)
  } catch (e) {
    console.log(e)
  }
}
