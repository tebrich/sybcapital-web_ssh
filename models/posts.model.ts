import { Categories, Entity, Files, Tags, Users } from '@/models'

export enum PostStatus {
  BORRADOR = 'BORRADOR',
  PUBLICADO = 'PUBLICADO',
  ELIMINADO = 'ELIMINADO',
}
export interface Posts extends Entity {
  title: string
  slug: string
  content: string
  excerpt: string
  author: Users
  categories: Categories[]
  tags: Tags[]
  files: Files[]
  shared: {
    facebook: number
    twitter: number
    linkedin: number
    whatsapp: number
    telegram: number
    email: number
    pinterest: number
  }
  status: PostStatus
}

export interface PostsFilter {
  limit: number
  page: number
  title?: string
  authorId?: number
  tags?: number[]
  categories?: number[]
}
