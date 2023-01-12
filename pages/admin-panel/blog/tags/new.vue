<template>
  <div>
    <v-card class="!sb-flex !sb-justify-between !sb-items-center !sb-my-5">
      <v-card-title class="!sb-font-extrabold !sb-text-xl">
        Nuevo Tag
      </v-card-title>
    </v-card>
    <v-card class="!sb-px-5 !sb-py-5">
      <validation-observer
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="createTag"
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
          Crear
        </v-btn>
      </validation-observer>
    </v-card>
  </div>
</template>

<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { useTags } from '@/composables'

export default defineComponent({
  // eslint-disable-next-line
  name: 'New',
  layout: 'admin',
  setup() {
    const tagComposable = useTags()
    const router = useRouter()

    const draft = ref({})
    const loading = ref(true)
    const submiting = ref(false)

    const createTag = async () => {
      submiting.value = true

      try {
        await tagComposable.create({
          name: draft.value.name,
        })

        router.replace('/admin-panel/blog/tags/')
      } catch (e) {
        console.log(e)
        submiting.value = false
      }
    }

    return {
      loading,
      draft,
      createTag,
      submiting,
    }
  },
})
</script>

<style></style>
