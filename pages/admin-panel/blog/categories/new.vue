<template>
  <div>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Nueva categoria
      </v-card-title>
    </v-card>
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="createCategory"
      >
        <validation-provider v-slot="{ errors }" name="title" rules="required">
          <v-text-field
            v-model="draft.name"
            label="Titulo"
            outlined
            :error-messages="errors"
          />
        </validation-provider>

        <v-text-field
          v-model="draft.description"
          label="Descripcion"
          outlined
          hide-details
        />

        <v-checkbox
          v-model="draft.featured"
          label="¿Es menú?"
          :disabled="draft.parentId"
          @change="draft.parentId = null"
        />

        <v-select
          v-if="!draft.featured"
          v-model="draft.parentId"
          :items="categories"
          item-value="id"
          item-text="name"
          outlined
          label="Categoria padre"
          clearable
        />

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
  useRouter,
} from '@nuxtjs/composition-api'
import { useCategories } from '@/composables'

export default defineComponent({
  // eslint-disable-next-line
  name: 'New',
  layout: 'admin',
  setup() {
    const categoryComposable = useCategories()
    const router = useRouter()

    const draft = ref({})
    const loading = ref(true)
    const submiting = ref(false)
    const categories = computed(() => categoryComposable.categories.value)

    const createCategory = async () => {
      submiting.value = true

      try {
        await categoryComposable.create({
          name: draft.value.name,
          description: draft.value.description || '',
        })

        router.replace('/admin-panel/blog/categories/')
      } catch (e) {
        console.log(e)
        submiting.value = false
      }
    }

    const getCategories = async () => {
      try {
        await categoryComposable.getAll({ limit: 1000, page: 1 })
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getCategories()
    })

    return {
      loading,
      draft,
      createCategory,
      submiting,
      categories,
    }
  },
})
</script>

<style></style>
