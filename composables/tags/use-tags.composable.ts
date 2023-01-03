import { ref, useContext } from '@nuxtjs/composition-api'
import { Tags, TagsFilter } from '@/models'

export const useTags = () => {
  const tags = ref<Tags[]>([])
  const tag = ref<Tags>()
  const totalTags = ref<number>(0)
  const draft = ref<Partial<Tags>>({})

  const { $axios } = useContext()

  const resetDraft = () => {
    draft.value = {}
  }

  const getAll = async (filters: TagsFilter) => {
    const [data, total] = await $axios.$get<[Tags[], number]>('/tags', {
      params: filters,
    })
    tags.value = data
    totalTags.value = total
  }

  const getOne = async (id: number) => {
    tag.value = await $axios.$get(`/tags/${id}`)
  }

  const create = async (tag: Tags) => {
    return await $axios.$post('/tags', tag)
  }

  const update = async (id: number, tag: Tags) => {
    return await $axios.$patch(`/tags/${id}`, tag)
  }

  const remove = async (id: number) => {
    return await $axios.$delete(`/tags/${id}`)
  }

  return {
    tags,
    tag,
    totalTags,
    draft,
    resetDraft,
    getAll,
    getOne,
    create,
    update,
    remove,
  }
}
