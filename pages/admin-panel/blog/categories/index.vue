<template>
  <div>
    <v-overlay v-if="categoryToDelete" :value="true" z-index="20">
      <v-card width="450">
        <v-card-title class="!sb-text-center">
          ¿Deseas borrar esta categoria?
        </v-card-title>
        <v-card-subtitle>{{ categoryToDelete.name }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="removeCategory"> Borrar </v-btn>
          <v-btn color="primary" @click="categoryToDelete = null">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-2xl">
        Categorias
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          large
          class="!sb-px-10 !sb-mr-5"
          nuxt
          link
          to="/admin-panel/blog/categories/new"
        >
          <v-icon>mdi-plus</v-icon>
          <span>Agregar</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="!sb-mb-10">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar (ID, Titulo)"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="categories"
        :items-per-page="20"
        :loading="loading"
        loading-text="Cargando categorias..."
        class="elevation-1"
        :search="search"
        hide-default-footer
      >
        <template #[`item.createdAt`]="{ item }">
          <span>{{ item.createdAt | formatDate }}</span>
        </template>
        <template #[`item.updatedAt`]="{ item }">
          <span>{{ item.updatedAt | formatDate }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon @click="editCategory(item.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="categoryToDelete = item">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center sb-py-5">
        <v-pagination v-model="page" :length="totalCategories"></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  watch,
  useRouter,
} from '@nuxtjs/composition-api'
import * as dayjs from 'dayjs'
import { useCategories } from '@/composables'

export default defineComponent({
  name: 'Index',

  filters: {
    formatDate(value) {
      return dayjs(value).format('DD/MM/YYYY')
    },
  },

  layout: 'admin',

  setup() {
    const categoriesComposable = useCategories()
    const router = useRouter()

    const page = ref(1)
    const limit = ref(20)
    const loading = ref(true)
    const search = ref('')
    const categories = ref([])
    const totalCategories = computed(() =>
      Math.ceil(categoriesComposable.totalCategories.value / limit.value)
    )
    const categoryToDelete = ref(null)

    const getCategories = async () => {
      loading.value = true
      categories.value = await categoriesComposable.getAll({
        limit: limit.value,
        page: page.value,
      })
      loading.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const editCategory = (slug) => {
      router.push(`/admin-panel/blog/categories/edit/${slug}`)
    }

    const removeCategory = async () => {
      await categoriesComposable.remove(categoryToDelete.value.id)
      categoryToDelete.value = null
      await getCategories()
    }

    onMounted(() => {
      getCategories()
    })

    watch(page, () => {
      getCategories({ limit: limit.value, page: page.value })
    })

    return {
      categories,
      page,
      loading,
      search,
      totalCategories,
      editCategory,
      categoryToDelete,
      removeCategory,
    }
  },

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name', width: 500 },
        { text: '¿Es menú?', value: 'featured' },
        { text: 'Creado', value: 'createdAt' },
        { text: 'Actualizado', value: 'updatedAt' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    }
  },
})
</script>

<style></style>
