import { Entity } from '@/models'
import { Posts } from '~/models/posts.model'

export interface Tags extends Entity {
  name: string
  slug: string
  posts: Posts[]
}
