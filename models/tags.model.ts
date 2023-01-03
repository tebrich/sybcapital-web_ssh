import { Entity } from '@/models'
import { Posts } from '~/models/posts.model'

export interface Tags extends Entity {
  name: string
  slug: string
  posts: Posts[]
}

export interface TagsFilter {
  limit: number
  page: number
  includePosts?: boolean
  includeDeleted?: boolean
  name?: string
}
