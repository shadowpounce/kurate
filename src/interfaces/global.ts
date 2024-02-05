export interface IMetadataDefault {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface BaseFields {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
