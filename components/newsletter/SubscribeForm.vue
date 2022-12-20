<template>
  <div class="sb-pb-2">
    <div>
      <h2 v-if="!dismindTitle" class="sb-font-bold sb-text-3xl sb-text-white">
        Join Our Free Stock Market Newsletter:
      </h2>
      <p v-if="!dismindDetail" class="!sb-my-2 sb-text-white sb-font-light sb-text-sm">
        SyBCapital.com is the #1 resource for all things Stocks. Sign up today for Free!
      </p>
    </div>
    <div class="!sb-my-5">
      <v-text-field label="Nombre *" type="text" solo hide-details class="!sb-mb-4" />
      <v-text-field label="Email *" type="email" solo hide-details class="!sb-mb-4" />
      <v-btn block class="!sb-bg-secondary !sb-text-white" large>
        <v-icon>mdi-email-outline</v-icon>  Suscribirse
      </v-btn>
      <span class="sb-opacity-70 sb-font-light sb-text-sm" :class="[!noticeBlack? 'sb-text-white' : 'sb-text-black']">
        We hate spam. Unsubscribe anytime.
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SubscribeForm',
  props: {
    dismindTitle: {
      type: Boolean,
      default: false
    },
    dismindDetail: {
      type: Boolean,
      default: false
    },
    noticeBlack: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>

</style>
