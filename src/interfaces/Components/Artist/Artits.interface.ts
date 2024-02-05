import { IMetadataDefault } from '../../global'
import { IComponent } from '../IComponent.interface'

export interface IArtist extends IComponent {
  attributes: {
    nickname: string
    slug: string
    fullname: string
    text: string
    link?: null | string
    theme: string
  }
}

export interface IArtistResponse {
  data: IArtist[]
  meta: {
    pagination: IMetadataDefault
  }
}
