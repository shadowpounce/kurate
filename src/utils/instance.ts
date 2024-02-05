import axios from 'axios'
import { STRAPI_URL } from '../config'

export const instanceCreate = (headers = {}) => {
  return axios.create({
    baseURL: STRAPI_URL + '/api',
    // withCredentials: false,
    headers: { accept: 'application/json', ...headers },
  })
}
