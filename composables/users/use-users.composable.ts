import { ref, useContext } from '@nuxtjs/composition-api'
import { Users } from '@/models'

export const useUsers = () => {
  const users = ref<Users[]>([])
  const draft = ref<Partial<Users>>({})

  const { $axios } = useContext()

  const resetDraft = () => {
    draft.value = {}
  }

  const getAll = async () => {
    users.value = await $axios.$get('/users')
  }

  return {
    users,
    draft,
    resetDraft,
    getAll,
  }
}
