<template>
  <div class="sb-pb-2">
    <div>
      <h2 v-if="!dismindTitle" class="sb-font-bold sb-text-3xl sb-text-white">
        Join Our Free Stock Market Newsletter:
      </h2>
      <p
        v-if="!dismindDetail"
        class="!sb-my-2 sb-text-white sb-font-light sb-text-sm"
      >
        SyBCapital.com is the #1 resource for all things Stocks. Sign up today
        for Free!
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
        We hate spam. Unsubscribe anytime.
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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

    const name = ref('')
    const email = ref('')

    const createSubscribe = async () => {
      try {
        await subscribeComposable.subscribeToNewsletter({
          name: name.value,
          email: email.value,
        })

        // eslint-disable-next-line no-alert
        alert('Gracias por registrarte!')
        name.value = ''
        email.value = ''
      } catch (e) {
        console.log(e)
      }
    }

    return {
      name,
      email,
      createSubscribe,
    }
  },
})
</script>

<style></style>
