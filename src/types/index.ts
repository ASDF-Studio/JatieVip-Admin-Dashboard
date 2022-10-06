export interface BaseResponse<T> {
  message: string
  code: number
  status: ApiResponseStatus
  result: T
}

export type SuccessResponse = BaseResponse<unknown>
export type ApiResponseStatus = 'error' | 'bad_request' | 'success' | 'Unauthorized' | 'unknown'

export type LoginSteps = 'step1' | 'step2'
export type SignUpSteps = 'step1' | 'step2'
