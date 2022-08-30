// eslint-disable-next-line max-classes-per-file
import { ApiResponseStatus, BaseResponse } from 'types'
import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios'

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
  hasAuth?: boolean
  headers?: IHeader
  params?: IParams
  cancelToken?: CancelToken
  isLocal?: boolean
}

const getToken = () => localStorage.getItem('access_token')

export const setToken = (token: string) => localStorage.setItem('access_token',token)

const getAuth = (hasAuth = false) =>
  hasAuth && getToken()
    ? {
        Authorization: `Bearer ${getToken()}`,
      }
    : {}

const genHeader = (hasAuth = false, headers = {}) => Object.assign(headers, getAuth(hasAuth))

const handleError = (err: any, reject: any) => {
  reject(new Error('cannot connect to server'))
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

const handleResponse = (options: AxiosRequestConfig, resp: AxiosResponse<BaseResponse<any>, any>, resolve, reject) => {
  const statusCode = resp.data.code
  const statusText = resp.data.status

  if (statusCode === 401) {
    localStorage.removeItem('access_token')
  }

  switch (statusText) {
    case 'success':
      resolve(resp.data)
      break
    case 'unauthorized':
      reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
      break
    case 'bad_request':
      reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
      break
    case 'error':
      reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
      break
    default: {
      reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
    }
  }
}

const request = async <T>(options: AxiosRequestConfig, isLocal = false) => {
  return new Promise<BaseResponse<T>>((resolve, reject) => {
    axios
      .request<BaseResponse<T>>({
        baseURL: isLocal ? baseLocalURL : baseURL,
        ...options,
      })
      .then((resp) => {
        handleResponse(options, resp, resolve, reject)
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
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        params: options?.params,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data.result)
  },
  post: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'POST',
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data.result)
  },
  put: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'PUT',
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data.result)
  },
  del: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: 'DELETE',
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false,
    ).then((data) => data.result)
  },
  cancelToken: axios.CancelToken.source(),
}

export default http
