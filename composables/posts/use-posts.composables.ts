import { ref, useContext } from '@nuxtjs/composition-api'
import { Posts, PostsFilter } from '@/models'
export const usePosts = () => {
  const posts = ref<Posts[]>([])
  const post = ref<Posts>()
  const draft = ref<Partial<Posts>>({})
  const totalPosts = ref<number>(0)
  const loadMorePosts = ref<boolean>(true)
  const { $axios } = useContext()

  const resetDraft = () => {
    draft.value = {}
  }

  const getAll = async (filter: PostsFilter) => {
    const [data, total] = await $axios.$get<[Posts[], number]>('/posts', {
      params: filter,
    })
    if (data.length === 0) {
      loadMorePosts.value = false
    }

    posts.value = [...posts.value, ...data]
    totalPosts.value = total

    return data
  }

  const getOne = async (id: number) => {
    post.value = await $axios.$get(`/posts/${id}`)
  }

  const getOneBySlug = async (slug: string) => {
    post.value = await $axios.$get(`/posts/slug/${slug}`)
  }

  const create = async (post: Posts) => {
    return await $axios.$post('/posts', post)
  }

  const update = async (id: number, post: Posts) => {
    return await $axios.$patch(`/posts/${id}`, post)
  }

  const updateShared = async (id: number, shared: string) => {
    return await $axios.$patch(`/posts/update/shared?id=${id}&shared=${shared}`)
  }

  const deletePost = async (id: number) => {
    return await $axios.$delete(`/posts/${id}`)
  }

  return {
    posts,
    post,
    totalPosts,
    getAll,
    getOne,
    getOneBySlug,
    create,
    update,
    deletePost,
    draft,
    resetDraft,
    loadMorePosts,
    updateShared,
  }
}
