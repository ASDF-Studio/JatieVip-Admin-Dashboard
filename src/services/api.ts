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

export const getToken = () => localStorage.getItem('jwt_token')

export const setToken = (token: string) => localStorage.setItem('jwt_token', token)

export const remToken = () => localStorage.removeItem('jwt_token')

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

const handleResponse = (options: AxiosRequestConfig, resp: AxiosResponse<any>, resolve, reject) => {
  const statusCode = resp.status

  if (statusCode === 401) {
    localStorage.removeItem('access_token')
  }

  switch (statusCode) {
    case 200:
      resolve(resp.data)
      break
    // case 'unauthorized':
    //   reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
    //   break
    // case 'bad_request':
    //   reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
    //   break
    // case 500:
    //   reject(new ApiErrorResponse(statusCode, "", resp.data.message))
    //   break
    default: {
      // reject(new ApiErrorResponse(statusCode, statusText, resp.data.message))
    }
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
    ).then((data) => data)
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
    ).then((data) => data)
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
    ).then((data) => data)
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
