import { Entity } from '@/models'
import { Posts } from '~/models/posts.model'

export interface Categories extends Entity {
  name: string
  slug: string
  description: string
  posts: Posts[]
}
