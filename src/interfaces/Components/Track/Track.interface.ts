import { IFile, IFileObject } from '../../File'
import { IMetadataDefault } from '../../global'
import { IArtist } from '../Artist/Artits.interface'
import { IGenre } from '../Genre/Genre.interface'
import { IComponent } from '../IComponent.interface'

export interface ITrack extends IComponent {
  attributes: {
    title: string
    slug: string
    cover: {
      data: {
        id: number
        attributes: IFileObject
      }
    }
    audio: {
      data: {
        id: number
        attributes: IFileObject
      }
    }
    genres: {
      data: IGenre[]
    }
    artists: {
      data: IArtist[]
    }
  }
}

export interface ITrackResponse {
  data: ITrack[]
  meta: {
    pagination: IMetadataDefault
  }
}
