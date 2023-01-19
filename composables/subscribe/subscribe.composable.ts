import { ref, useContext } from '@nuxtjs/composition-api'

export const useSubscribe = () => {
  const subscribe = ref(null)

  const { $axios } = useContext()

  const subscribeToNewsletter = async ({
    name,
    email,
  }: {
    name: string
    email: string
  }) => {
    subscribe.value = await $axios.$post('/subscribe', { name, email })
  }

  return {
    subscribe,
    subscribeToNewsletter,
  }
}
