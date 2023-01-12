import { useContext } from '@nuxtjs/composition-api'
import { Files } from '~/models'

export const useFiles = () => {
  const { $axios } = useContext()
  const uploadFile = async (file: File): Promise<Files[]> => {
    const formData = new FormData()
    formData.append('file', file)
    const data = await $axios.$post('/files/upload-image/posts', formData)
    return [data]
  }

  return {
    uploadFile,
  }
}
