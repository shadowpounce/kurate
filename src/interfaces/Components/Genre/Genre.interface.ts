import { IMetadataDefault } from '../../global'
import { IComponent } from '../IComponent.interface'

export interface IGenre extends IComponent {
  attributes: {
    title: string
    slug: string
  }
}

export interface IGenreResponse {
  data: IGenre[]
  meta: {
    pagination: IMetadataDefault
  }
}
