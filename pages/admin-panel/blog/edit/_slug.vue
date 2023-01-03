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
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer v-slot="{ validate }">
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
            outlined
            label="Estado"
            :items="['PUBLICADO', 'BORRADOR', 'ELIMINADO']"
            v-model="draft.status"
          />
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="author" rules="required">
          <v-select
            outlined
            label="Autor"
            :items="users"
            item-text="fullName"
            item-value="id"
            v-model="draft.author"
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
            item-value="id"
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
            item-value="id"
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
            label="File input"
            filled
            :error-messages="errors"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </validation-provider>
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
} from '@nuxtjs/composition-api'
import { usePosts, useCategories, useUsers, useTags } from '@/composables'
import SyBTiptapFild from '~/components/commons/SyBTiptapFild.vue'
export default defineComponent({
  // eslint-disable-next-line
  name: 'Edit',
  components: { SyBTiptapFild },
  layout: 'admin',
  setup() {
    const postComposable = usePosts()
    const categoryComposable = useCategories()
    const tagComposable = useTags()
    const userComposable = useUsers()
    const route = useRoute()

    const post = computed(() => postComposable.post.value)
    const categories = computed(() => categoryComposable.categories.value)
    const tags = computed(() => tagComposable.tags.value)
    const users = computed(() => userComposable.users.value)
    const draft = ref({})
    const { slug } = route.value.params
    const loading = ref(true)

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
        draft.value = post.value
      })
    })

    return {
      post,
      loading,
      draft,
      categories,
      tags,
      users,
    }
  },
})
</script>

<style></style>
