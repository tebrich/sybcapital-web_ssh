<template>
  <div>
    <v-card
      v-if="post"
      class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5"
    >
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Editar - {{ post.title }}
      </v-card-title>
    </v-card>

    <!-- Muestra loader mientras carga datos -->
    <v-card v-if="loading" class="!sb-pa-5 sb-text-center">
      <v-progress-circular indeterminate color="primary" />
    </v-card>

    <!-- Formulario de edición, muestra cuando ya cargó -->
    <v-card v-else class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="updatePosts"
      >
        <!-- Título -->
        <validation-provider v-slot="{ errors }" name="title" rules="required">
          <v-text-field
            v-model="draft.title"
            label="Titulo"
            outlined
            :error-messages="errors"
          />
        </validation-provider>

        <!-- Estado -->
        <validation-provider v-slot="{ errors }" name="status" rules="required">
          <v-select
            v-model="draft.status"
            outlined
            label="Estado"
            :items="['PUBLICADO', 'BORRADOR', 'ELIMINADO']"
          />
        </validation-provider>

        <!-- Autor -->
        <validation-provider v-slot="{ errors }" name="author" rules="required">
          <v-select
            v-model="draft.author"
            outlined
            label="Autor"
            :items="users"
            item-text="fullName"
            item-value="id"
            :error-messages="errors"
          />
        </validation-provider>

        <!-- Categorías -->
        <validation-provider
          v-slot="{ errors }"
          name="categories"
          rules="required"
        >
          <v-select
            v-model="draft.categories"
            :items="categories"
            label="Categorias"
            multiple
            chips
            outlined
            item-text="name"
            item-value="name"
            :error-messages="errors"
          />
        </validation-provider>

        <!-- Tags -->
        <validation-provider v-slot="{ errors }" name="tags" rules="required">
          <v-select
            v-model="draft.tags"
            outlined
            :items="tags"
            label="Tags"
            multiple
            chips
            item-text="name"
            item-value="name"
            :error-messages="errors"
          />
        </validation-provider>

        <!-- Excerpt -->
        <validation-provider
          v-slot="{ errors }"
          name="excerpt"
          rules="required|max:500"
        >
          <sy-b-tiptap-fild
            v-model="draft.excerpt"
            :use-image-extensions="false"
            label="Excerpt"
          />
          <p
            v-for="(item, index) in errors"
            :key="index"
            class="sb-text-red-500 sb-text-sm sb-font-light"
          >
            {{ item }}
          </p>
        </validation-provider>

        <!-- Contenido -->
        <validation-provider
          v-slot="{ errors }"
          name="content"
          rules="required|max:14700000"
        >
          <sy-b-tiptap-fild
            v-model="draft.content"
            :use-image-extensions="true"
            label="Contenido"
          />
          <p
            v-for="(item, index) in errors"
            :key="index"
            class="sb-text-red-500 sb-text-sm sb-font-light"
          >
            {{ item }}
          </p>
        </validation-provider>

        <!-- Imagen destacada -->
        <div
          v-if="!showImageFileInput && draft.files.length > 0"
          class="sb-relative sb-mb-5"
        >
          <p>Imagen destacada</p>
          <v-img :src="draft.files[0].url" />
          <v-icon
            class="!sb-absolute sb-top-14 sb-right-5"
            size="40"
            color="red"
            @click="showImageFileInput = true"
          >
            mdi-close-circle
          </v-icon>
        </div>

        <validation-provider
          v-else
          v-slot="{ errors }"
          name="image"
          rules="required"
        >
          <v-file-input
            v-model="draft.files"
            label="Imagen destacada"
            filled
            :error-messages="errors"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </validation-provider>

        <!-- Botón de envío -->
        <v-btn
          large
          color="secondary"
          type="submit"
          :disabled="invalid"
          class="sb-flex sb-justify-center sb-mx-auto"
          :loading="submiting"
        >
          Editar
        </v-btn>
      </validation-observer>
    </v-card>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
import {
  usePosts,
  useCategories,
  useUsers,
  useTags,
  useFiles
} from '@/composables'
import SyBTiptapFild from '~/components/commons/SyBTiptapFild.vue'

export default defineComponent({
  name: 'Edit',
  components: { SyBTiptapFild },
  layout: 'admin',
  setup() {
    const postComposable = usePosts()
    const categoryComposable = useCategories()
    const tagComposable = useTags()
    const userComposable = useUsers()
    const filesComposable = useFiles()
    const route = useRoute()
    const router = useRouter()

    const post = computed(() => postComposable.post.value)
    const categories = computed(() => categoryComposable.categories.value)
    const tags = computed(() => tagComposable.tags.value)
    const users = computed(() => userComposable.users.value)
    const loading = ref(true)
    const showImageFileInput = ref(true)
    const submiting = ref(false)

    // Inicializa draft con valores por defecto
    const draft = ref({
      title: '',
      status: 'BORRADOR',
      author: null,
      categories: [],
      tags: [],
      excerpt: '',
      content: '',
      files: []
    })

    const { slug } = route.value.params

    const getPost = async () => {
      loading.value = true
      await postComposable.getOneBySlug(slug)
      await categoryComposable.getAll({ limit: 100, page: 1 })
      await tagComposable.getAll({ limit: 100, page: 1 })
      await userComposable.getAll()
      loading.value = false
    }

    onMounted(() => {
      getPost().finally(() => {
        const p = post.value || {}
        draft.value = {
          title: p.title || '',
          status: p.status || 'BORRADOR',
          author: p.author?.id || null,
          categories: p.categories || [],
          tags: p.tags || [],
          excerpt: p.excerpt || '',
          content: p.content || '',
          files: p.files && p.files.length > 0 ? p.files : []
        }
        if (draft.value.files.length > 0) {
          showImageFileInput.value = false
        }
      })
    })

    const updatePosts = async () => {
      submiting.value = true

      // Normaliza categorías y tags a listas de nombres
      const categoriesList = draft.value.categories.map(c => c.hasOwnProperty('name') ? c.name : c)
      const tagsList = draft.value.tags.map(t => t.hasOwnProperty('name') ? t.name : t)

      try {
        let imageFiles = draft.value.files
        if (showImageFileInput.value) {
          imageFiles = await filesComposable.uploadFile(draft.value.files, true)
        }

        await postComposable.update(post.value.id, {
          author: draft.value.author,
          categories: categoriesList,
          tags: tagsList,
          content: draft.value.content,
          excerpt: draft.value.excerpt,
          files: imageFiles[0].id,
          status: draft.value.status,
          title: draft.value.title
        })

        router.replace('/admin-panel/blog/posts')
      } catch (e) {
        console.error(e)
        submiting.value = false
      }
    }

    return {
      post,
      loading,
      draft,
      categories,
      tags,
      users,
      updatePosts,
      showImageFileInput,
      submiting
    }
  }
})
</script>

<style scoped></style>

