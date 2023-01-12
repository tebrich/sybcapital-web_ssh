<template>
  <div>
    <v-overlay v-if="postToDelete" :value="true" z-index="20">
      <v-card width="450">
        <v-card-title class="!sb-text-center">
          ¿Deseas borrar esta publicación?
        </v-card-title>
        <v-card-subtitle>{{ postToDelete.title }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="removePost">Borrar</v-btn>
          <v-btn color="primary" @click="postToDelete = null">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-2xl">
        Publicaciones
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          large
          class="!sb-px-10 !sb-mr-5"
          nuxt
          link
          to="/admin-panel/blog/new"
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
          label="Buscar (ID, Titulo, Autor, Fecha)"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="posts"
        :items-per-page="20"
        :loading="loading"
        loading-text="Cargando publicaciones..."
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
          <v-btn icon @click="editPost(item.slug)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="postToDelete = item">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="viewPost(item.slug)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center sb-py-5">
        <v-pagination v-model="page" :length="totalPost"></v-pagination>
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
import { usePosts } from '@/composables'

export default defineComponent({
  name: 'Posts',

  filters: {
    formatDate(value) {
      return dayjs(value).format('DD/MM/YYYY')
    },
  },

  layout: 'admin',

  setup() {
    const postComposable = usePosts()
    const router = useRouter()

    const page = ref(1)
    const limit = ref(20)
    const loading = ref(true)
    const search = ref('')
    const posts = ref([])
    const totalPost = computed(() =>
      Math.ceil(postComposable.totalPosts.value / limit.value)
    )
    const postToDelete = ref(null)

    const getPosts = async () => {
      loading.value = true
      posts.value = await postComposable.getAll({
        limit: limit.value,
        page: page.value,
      })
      loading.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const editPost = (slug) => {
      router.push(`/admin-panel/blog/edit/${slug}`)
    }

    const viewPost = (slug) => {
      window.open(`/post/${slug}`, '_blank')
    }

    const removePost = async () => {
      await postComposable.deletePost(postToDelete.value.id)
      postToDelete.value = null
      await getPosts()
    }

    onMounted(() => {
      getPosts()
    })

    watch(page, () => {
      getPosts({ limit: limit.value, page: page.value })
    })

    return {
      posts,
      page,
      loading,
      search,
      totalPost,
      editPost,
      viewPost,
      postToDelete,
      removePost,
    }
  },

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Titulo', value: 'title', width: 500 },
        { text: 'Autor', value: 'author.fullName' },
        { text: 'Creado', value: 'createdAt' },
        { text: 'Actualizado', value: 'updatedAt' },
        { text: 'Estado', value: 'status' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    }
  },
})
</script>

<style></style>
