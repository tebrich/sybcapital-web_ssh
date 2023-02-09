<template>
  <div v-if="showUploader" class="sb-w-full">
    <file-pond
      ref="pond"
      label-idle="Arrastra o selecciona para subir tu imagen"
      :allow-multiple="false"
      accepted-file-types="image/jpeg, image/png, image/jpg"
      :store-as-file="true"
      max-file-size="5MB"
      file-validate-type-label-expected-types="Solo se permite {allTypes}"
      label-file-type-not-allowed="Formato no valido"
      label-max-file-size-exceeded="Archivo muy pesado"
      label-max-file-size="Maximo permitido es {filesize}"
    />
    <v-btn block outlined class="mt-5" :loading="loading" @click="selectImage">
      Cargar archivo
    </v-btn>
  </div>
</template>

<script>
import { defineComponent, ref, reqRef } from '@nuxtjs/composition-api'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
// eslint-disable-next-line import/default
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// eslint-disable-next-line import/default
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
// eslint-disable-next-line import/default
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { useFiles } from '~/composables'
export default defineComponent({
  name: 'FileSelector',
  components: {
    FilePond: vueFilePond(
      FilePondPluginImagePreview,
      FilePondPluginFileValidateSize,
      FilePondPluginFileValidateType
    ),
  },
  setup(_, { emit }) {
    const loading = ref(false)
    const showUploader = ref(true)

    const pond = reqRef('pond')

    const useFileComposable = useFiles()

    const selectImage = async () => {
      loading.value = true

      const ponds = pond.value
      const { file } = ponds.getFile()
      if (!file) {
        loading.value = false
        return
      }

      const data = await useFileComposable.uploadFile(file)

      emit('select-file', { src: data[0].filePath, alt: '' })
      loading.value = false
      showUploader.value = false
    }

    return {
      loading,
      pond,
      selectImage,
      showUploader,
    }
  },
})
</script>

<style scoped>
.selectable {
  cursor: pointer;
}
</style>
