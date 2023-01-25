import { useContext } from '@nuxtjs/composition-api'
import { Contacts } from '@/models'
export const useContacts = () => {
  const { $axios } = useContext()
  const createContact = async (contact: Partial<Contacts>) => {
    return await $axios.$post('/contact', contact)
  }

  return {
    createContact,
  }
}
