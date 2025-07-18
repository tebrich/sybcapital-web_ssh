import { ref, useContext } from '@nuxtjs/composition-api'
import { Categories, CategoriesFilter } from '@/models'

export const useCategories = () => {
  const categories = ref<Categories[]>([])
  const category = ref<Categories>()
  const categoriesMenu = ref<Categories[]>([])
  const totalCategories = ref<number>(0)
  const draft = ref<Partial<Categories>>({})

  const { $axios } = useContext()

  const resetDraft = () => {
    draft.value = {}
  }
  const getAll = async (filters: CategoriesFilter) => {
    const [data, total] = await $axios.$get<[Categories[], number]>(
      '/categories',
      { params: filters }
    )
    categories.value = data
    totalCategories.value = total

    return data
  }

  const getOne = async (id: number) => {
    category.value = await $axios.$get(`/categories/${id}`)
  }

  const getOneBySlug = async (slug: string) => {
    return await $axios.$get(`/categories/slug/${slug}`)
  }

  const create = async (category: Categories) => {
    return await $axios.$post('/categories', category)
  }

  const update = async (id: number, category: Categories) => {
    return await $axios.$patch(`/categories/${id}`, category)
  }

  const remove = async (id: number) => {
    return await $axios.$delete(`/categories/${id}`)
  }

  const getCategoriesMenu = async () => {
    categoriesMenu.value = await $axios.$get<Categories[]>(
      '/categories/list/menu'
    )
  }

  return {
    categories,
    category,
    draft,
    totalCategories,
    resetDraft,
    getAll,
    getOne,
    create,
    update,
    remove,
    getCategoriesMenu,
    categoriesMenu,
    getOneBySlug,
  }
}
