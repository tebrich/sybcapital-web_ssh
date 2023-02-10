<template>
  <div class="sb-my-10">
    <h2 class="sb-text-6xl sb-font-bold sb-text-gray-900">Gracias</h2>
    <h3 class="sb-text-xl md:sb-text-3xl sb-font-normal sb-my-10">
      Usted está suscrito al Newsletter de
      <a class="sb-text-primary" href="/">sybcapital.com</a>. Agradecemos su
      preferencia.
    </h3>
    <h3>
      Haga clic <a class="sb-text-primary" href="/">aquí</a> para volver a la
      página principal.
    </h3>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ThanksForSubscribe',
  auth: false,
})
</script>
<style></style>
