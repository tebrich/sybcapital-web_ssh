<template>
  <div class="sb-pb-2">
    <div>
      <h2 v-if="!dismindTitle" class="sb-font-bold sb-text-3xl sb-text-white">
        Suscríbase a nuestro Newsletter GRATIS
      </h2>
      <p
        v-if="!dismindDetail"
        class="!sb-my-2 sb-text-white sb-font-light sb-text-sm"
      >
        SyBCapital.com es la plataforma #1 de información sobre el mercado
        financiero. Únase gratis hoy y reciba actualizaciones semanales,
        consejos de trading, señales y más.
      </p>
    </div>
    <div class="!sb-my-5">
      <validation-observer v-slot="{ invalid }" tag="form">
        <validation-provider v-slot="{ errors }" name="nombre" rules="required">
          <v-text-field
            v-model="name"
            label="Nombre *"
            type="text"
            solo
            :error-messages="errors"
            hide-details
            class="!sb-mb-4"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            label="Email *"
            type="email"
            solo
            :error-messages="errors"
            hide-details
            class="!sb-mb-4"
          />
        </validation-provider>

        <!-- Mensajes de estado -->
        <div v-if="loading" class="sb-text-sm sb-text-gray-500 sb-mb-2">
          Enviando...
        </div>
        <div v-if="successMessage" class="sb-text-sm sb-text-green-600 sb-mb-2">
          {{ successMessage }}
        </div>
        <v-btn
          block
          class="!sb-bg-secondary !sb-text-white"
          large
          :disabled="invalid"
          @click="createSubscribe"
        >
          <v-icon>mdi-email-outline</v-icon> Suscribirse
        </v-btn>
      </validation-observer>
      <span
        class="sb-opacity-70 sb-font-light sb-text-sm"
        :class="[!noticeBlack ? 'sb-text-white' : 'sb-text-black']"
      >
        Odiamos el spam. Desuscribete en cualquier momento.
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { useSubscribe } from '~/composables'

export default defineComponent({
  name: 'SubscribeForm',
  props: {
    dismindTitle: {
      type: Boolean,
      default: false,
    },
    dismindDetail: {
      type: Boolean,
      default: false,
    },
    noticeBlack: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const subscribeComposable = useSubscribe()
    const router = useRouter()

    const name = ref('')
    const email = ref('')
    const loading = ref(false)
    const successMessage = ref('')

    const createSubscribe = async () => {
      loading.value = true
      successMessage.value = ''
      try {
        await subscribeComposable.subscribeToNewsletter({
          name: name.value,
          email: email.value,
        })
        name.value = ''
        email.value = ''
        successMessage.value = '¡Suscripción exitosa! Redirigiendo...'
        setTimeout(() => {
          router.push('/newsletter/thanks')
        }, 1500) // espera 1.5 segundos antes de redirigir
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }

    return {
      name,
      email,
      loading,
      successMessage,
      createSubscribe,
    }
  },
})
</script>

<style></style>
