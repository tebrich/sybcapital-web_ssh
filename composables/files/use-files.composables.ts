import { useContext } from '@nuxtjs/composition-api'
import { Files } from '~/models'

export const useFiles = () => {
  const { $axios } = useContext()
  const uploadFile = async (file: File, feature = false): Promise<Files[]> => {
    const formData = new FormData()
    formData.append('file', file)
    const data = await $axios.$post('/files/upload-image/posts', formData, {
      params: { feature },
    })
    return [data]
  }

  return {
    uploadFile,
  }
}
