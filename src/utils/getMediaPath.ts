import { STRAPI_URL } from '../config'
import { IFileObject } from '../interfaces/File'

export const getMediaPath = (data: IFileObject, justUrl: boolean = false) => {
  const path = justUrl ? data.url : STRAPI_URL + data.url

  return path
}
