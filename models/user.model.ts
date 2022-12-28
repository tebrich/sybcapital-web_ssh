import { Entity } from '@/models'
import { Posts } from '~/models/posts.model'

export interface Users extends Entity {
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  active: boolean
  posts: Posts[]
}
