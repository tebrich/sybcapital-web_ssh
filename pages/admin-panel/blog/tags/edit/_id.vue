<template>
  <div>
    <v-card
      v-if="tag"
      class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5"
    >
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Editar - {{ tag.name }}
      </v-card-title>
    </v-card>
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="updateTag"
      >
        <validation-provider v-slot="{ errors }" name="title" rules="required">
          <v-text-field
            v-model="draft.name"
            label="Titulo"
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
import { useTags } from '@/composables'
import categories from '~/pages/admin-panel/blog/categories/index.vue'
export default defineComponent({
  // eslint-disable-next-line
  name: 'Edit',
  layout: 'admin',
  setup() {
    const tagComposable = useTags()
    const route = useRoute()
    const router = useRouter()

    const tag = computed(() => tagComposable.tag.value)
    const draft = ref({})
    const { id } = route.value.params
    const loading = ref(true)
    const submiting = ref(false)

    const getTag = async () => {
      loading.value = true
      await tagComposable.getOne(id)
      loading.value = false
    }

    onMounted(() => {
      getTag().finally(() => {
        draft.value = tag.value
      })
    })

    const updateTag = async () => {
      submiting.value = true

      try {
        await tagComposable.update(tag.value.id, {
          name: draft.value.name,
        })

        router.replace('/admin-panel/blog/tags/')
      } catch (e) {
        console.log(e)
        submiting.value = false
      }
    }

    return {
      tag,
      loading,
      draft,
      categories,
      updateTag,
      submiting,
    }
  },
})
</script>

<style></style>
