<template>
  <div>
    <h2 class="sb-text-center sb-text-3xl sb-font-bold sb-mb-10">Contacto</h2>
    <v-row class="!sb-mb-10" justify="center">
      <v-col cols="8">
        <validation-observer
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="createPosts"
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
            name="email"
            rules="required"
          >
            <v-textarea
              outlined
              label="Mensaje"
              v-model="form.message"
              :error-messages="errors"
            />
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
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'
export default defineComponent({
  name: 'Contact',
  components: { MarketsTable, SubscribeNewsLetter },
  auth: false,
  setup() {
    const form = ref({
      name: '',
      email: '',
      message: '',
    })

    return {
      form,
    }
  },
})
</script>
<style></style>
