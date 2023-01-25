<template>
  <div>
    <h2 class="sb-text-center sb-text-3xl sb-font-bold sb-mb-10">Contacto</h2>
    <v-row class="!sb-mb-10" justify="center">
      <v-col cols="8">
        <validation-observer
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="createContact"
        >
          <validation-provider v-slot="{ errors }" name="name" rules="required">
            <v-text-field
              v-model="form.name"
              :error-messages="errors"
              outlined
              label="Nombre"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              outlined
              label="Email"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="message"
            rules="required|max:200"
          >
            <v-textarea
              v-model="form.message"
              outlined
              label="Mensaje"
              :error-messages="errors"
              counter
              :rules="[
                (v) =>
                  (v || '').length <= 200 ||
                  'Description must be 200 characters or less',
              ]"
            >
              <template #[`counter`]="{ props }">
                <span>{{ props.value }} / 200</span>
              </template>
            </v-textarea>
          </validation-provider>
          <v-btn
            type="submit"
            :disabled="invalid"
            class="!sb-bg-secondary !sb-text-white"
            block
            large
          >
            Enviar
          </v-btn>
        </validation-observer>
      </v-col>
      <v-col cols="4">
        <div class="sb-w-full">
          <subscribe-news-letter />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import { useContacts } from '@/composables'

export default defineComponent({
  name: 'Contact',
  components: { SubscribeNewsLetter },
  auth: false,
  setup() {
    const form = ref({
      name: '',
      email: '',
      message: '',
    })

    const contactsComposable = useContacts()

    const createContact = async () => {
      try {
        await contactsComposable.createContact(form.value)
        // eslint-disable-next-line no-alert
        alert('Mensaje enviado correctamente')
        window.location.reload()
      } catch (e) {
        console.log(e)
      }
    }

    return {
      form,
      createContact,
    }
  },
})
</script>

<style></style>
