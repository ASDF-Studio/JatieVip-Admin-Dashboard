// eslint-disable-next-line max-classes-per-file
import { ApiResponseStatus, BaseResponse } from 'types'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACK_URL
const baseLocalURL = process.env.NEXT_PUBLIC_LOCAL_URL

export interface IParams {
  [key: string]: string
}

export interface IHeader {
  [key: string]: any
}

export interface IBody {
  [key: string]: any
}

export interface IOption {
  body?: IBody
  jwttoken?: string | null
  headers?: IHeader
  params?: IParams
  cancelToken?: CancelToken
  isLocal?: boolean
}

const getAuth = (hasAuth = null) =>
  hasAuth
    ? {
        Authorization: `Bearer ${hasAuth}`,
      }
    : {}

const genHeader = (hasAuth = null, headers = {}) => Object.assign(headers, getAuth(hasAuth))

const handleError = (err: AxiosError<{ message: string }>, reject: any) => {
  reject(new ApiErrorResponse(err.response.status, '', err.response.data.message))
}

export class ApiErrorResponse extends Error {
  public statusCode
  public statusText: ApiResponseStatus

  constructor(statusCode: number, statusText: ApiResponseStatus, message) {
    super(message)
    this.statusCode = statusCode
    this.statusText = statusText
  }
}

const request = async <T>(options: AxiosRequestConfig, isLocal = false) => {
  return new Promise<T>((resolve, reject) => {
    axios
      .request<T>({
        baseURL: isLocal ? baseLocalURL : baseURL,
        ...options,
      })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((err) => handleError(err, reject))
  })
}

const http = {
  get: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'GET',
        url,
        headers: genHeader(options?.jwttoken, options?.headers) as any,
        params: options?.params,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data)
  },
  post: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'POST',
        url,
        headers: genHeader(options?.jwttoken, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data)
  },
  put: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'PUT',
        url,
        headers: genHeader(options?.jwttoken, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data)
  },
  del: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'DELETE',
        url,
        headers: genHeader(options?.jwttoken, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data)
  },
  cancelToken: axios.CancelToken.source(),
}

export default http
