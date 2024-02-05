import { BaseFields } from '../global'

export interface IComponent extends BaseFields {
  attributes: {
    [key: string]: any
  }
}
