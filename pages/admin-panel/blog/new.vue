<template>
  <div>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Agregar nueva publicacion
      </v-card-title>
    </v-card>
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="createPosts"
      >
        <validation-provider v-slot="{ errors }" name="title" rules="required">
          <v-text-field
            v-model="draft.title"
            label="Titulo"
            outlined
            :error-messages="errors"
          />
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="status" rules="required">
          <v-select
            v-model="draft.status"
            outlined
            label="Estado"
            :items="['PUBLICADO', 'BORRADOR', 'ELIMINADO']"
            :error-messages="errors"
          />
        </validation-provider>

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

        <validation-provider
          v-slot="{ errors }"
          name="excerpt"
          rules="required"
        >
          <sy-b-tiptap-fild
            v-model="draft.excerpt"
            :error-messages="errors"
            :use-image-extensions="false"
            label="Excerpt"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="content"
          rules="required"
        >
          <sy-b-tiptap-fild
            v-model="draft.content"
            :use-image-extensions="true"
            :error-messages="errors"
            label="Contenido"
          />
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="image" rules="required">
          <v-file-input
            v-model="draft.files"
            label="Imagen destacada"
            filled
            :error-messages="errors"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </validation-provider>

        <v-btn
          large
          color="secondary"
          type="submit"
          :disabled="invalid"
          class="sb-flex sb-justify-center sb-mx-auto"
          :loading="submiting"
        >
          Crear
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
  useRouter,
} from '@nuxtjs/composition-api'
import {
  usePosts,
  useCategories,
  useUsers,
  useTags,
  useFiles,
} from '@/composables'
import SyBTiptapFild from '~/components/commons/SyBTiptapFild.vue'
export default defineComponent({
  // eslint-disable-next-line
  name: 'New',
  components: { SyBTiptapFild },
  layout: 'admin',
  setup() {
    const postComposable = usePosts()
    const categoryComposable = useCategories()
    const tagComposable = useTags()
    const userComposable = useUsers()
    const filesComposable = useFiles()
    const router = useRouter()

    const categories = computed(() => categoryComposable.categories.value)
    const tags = computed(() => tagComposable.tags.value)
    const users = computed(() => userComposable.users.value)
    const draft = ref({})

    const loading = ref(true)
    const submiting = ref(false)

    const getPostData = async () => {
      loading.value = true
      await categoryComposable.getAll({ limit: 100, page: 1 })
      await tagComposable.getAll({ limit: 100, page: 1 })
      await userComposable.getAll()
      loading.value = false
    }

    onMounted(() => {
      getPostData()
    })

    const createPosts = async () => {
      submiting.value = true

      const categories = draft.value.categories
      const tags = draft.value.tags

      try {
        const image = await filesComposable.uploadFile(draft.value.files)

        await postComposable.create({
          authorId: draft.value.author,
          categories,
          tags,
          content: draft.value.content,
          excerpt: draft.value.excerpt,
          files: image[0].id,
          status: draft.value.status,
          title: draft.value.title,
        })

        router.replace('/admin-panel/blog/posts')
      } catch (e) {
        console.log(e)
        submiting.value = false
      }
    }

    return {
      loading,
      draft,
      categories,
      tags,
      users,
      createPosts,
      submiting,
    }
  },
})
</script>

<style></style>
