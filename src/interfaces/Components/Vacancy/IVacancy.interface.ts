import { IMetadataDefault } from '../../global'
import { IComponent } from '../IComponent.interface'

export interface IVacancy extends IComponent {
  attributes: {
    title: string
    type: string
    location: string
    content: string
    link?: string | null
  }
}

export interface IVacancyResponse {
  data: IVacancy[]
  meta: {
    pagination: IMetadataDefault
  }
}
