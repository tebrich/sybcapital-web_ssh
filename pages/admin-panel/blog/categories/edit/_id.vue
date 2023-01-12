<template>
  <div>
    <v-card
      v-if="category"
      class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5"
    >
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Editar - {{ category.name }}
      </v-card-title>
    </v-card>
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="updateCategory"
      >
        <validation-provider v-slot="{ errors }" name="title" rules="required">
          <v-text-field
            v-model="draft.name"
            label="Titulo"
            outlined
            :error-messages="errors"
          />
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="description">
          <v-text-field
            v-model="draft.description"
            label="Descripcion"
            outlined
            :error-messages="errors"
          />
        </validation-provider>

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
  useRouter,
} from '@nuxtjs/composition-api'
import { useCategories } from '@/composables'
import categories from '~/pages/admin-panel/blog/categories/index.vue'
export default defineComponent({
  // eslint-disable-next-line
  name: 'Edit',
  layout: 'admin',
  setup() {
    const categoryComposable = useCategories()
    const route = useRoute()
    const router = useRouter()

    const category = computed(() => categoryComposable.category.value)
    const draft = ref({})
    const { id } = route.value.params
    const loading = ref(true)
    const submiting = ref(false)

    const getCategory = async () => {
      loading.value = true
      await categoryComposable.getOne(id)
      loading.value = false
    }

    onMounted(() => {
      getCategory().finally(() => {
        draft.value = category.value
      })
    })

    const updateCategory = async () => {
      submiting.value = true

      try {
        await categoryComposable.update(category.value.id, {
          name: draft.value.name,
          description: draft.value.description || '',
        })

        router.replace('/admin-panel/blog/categories/')
      } catch (e) {
        console.log(e)
        submiting.value = false
      }
    }

    return {
      category,
      loading,
      draft,
      categories,
      updateCategory,
      submiting,
    }
  },
})
</script>

<style></style>
