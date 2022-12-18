<template>
  <v-app>
    <page-header />
    <v-main>
      <v-container>
        <div class="sb-py-5">
          <nuxt />
        </div>
      </v-container>
    </v-main>
    <page-footer />
  </v-app>
</template>

<script>
import PageHeader from '~/components/header/PageHeader.vue'
import PageFooter from '~/components/footer/PageFooter.vue'

export default {
  name: 'Default',

  components: {
    PageHeader,
    PageFooter
  }
}
</script>
