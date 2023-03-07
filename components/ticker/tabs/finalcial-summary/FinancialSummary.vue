<template>
  <div class="sb-mt-10">
    <v-row>
      <v-col cols="12" md="7">
        <financial-resume :symbol="$route.params.symbol" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import FinancialResume from '~/components/ticker/tabs/finalcial-summary/resume/FinancialResume.vue'

export default defineComponent({
  name: 'FinancialSummary',
  components: { FinancialResume },
  setup() {
    return {}
  }
})
</script>

<style></style>
