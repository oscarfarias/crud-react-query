import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import https from 'https'
import { TOKEN_KEY } from 'common/config/constants'
import { AugmentedUser, SerializedResponse } from 'common/types'
import { Role } from 'entities'

const requestHandler = (config: AxiosRequestConfig): unknown => {
  if (config.headers) {
    if (typeof window !== `undefined`) {
      const token = window.localStorage.getItem(TOKEN_KEY) ?? ``
      config.headers.Authorization = token
    }
  }
  return config
}
const responseHandler = (response: AxiosResponse): unknown => {
  const {
    data: { data, error, success },
  } = response
  if (success) {
    return data
  } else {
    return Promise.reject(error)
  }
}
const baseURL = process.env.APP_API_URL ?? `/api`
const axiosInstance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  validateStatus() {
    return true
  },
})
axiosInstance.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error),
)
axiosInstance.interceptors.response.use(responseHandler, (error) =>
  Promise.reject(error),
)

const API = {
  getUsers: async (): Promise<
    SerializedResponse<AugmentedUser, { users: string }>
  > => {
    return axiosInstance.get(`/users`)
  },
  getRoles: async (): Promise<SerializedResponse<Role, { roles: string }>> => {
    return axiosInstance.get(`/roles`)
  },
  deleteUser: async (usersIds: string[]): Promise<string[]> => {
    return axiosInstance.delete(`/users`, {
      data: {
        usersIds,
      },
    })
  },
  upsertUser: async (user: AugmentedUser): Promise<AugmentedUser> => {
    return axiosInstance.post(`/users`, user)
  },
}
export default API
