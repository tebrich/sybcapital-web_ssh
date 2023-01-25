import { Entity } from '~/models/entity.model'

export interface Contacts extends Entity {
  name: string
  email: string
  message: string
}
