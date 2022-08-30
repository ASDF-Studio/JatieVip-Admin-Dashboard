export type IUser = {
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface BaseResponse<T> {
  message: string
  code: number
  status: ApiResponseStatus
  result: T
}

export type SuccessResponse = BaseResponse<unknown>
export type ApiResponseStatus = 'error' | 'bad_request' | 'success' | 'unauthorized' | 'unknown'
