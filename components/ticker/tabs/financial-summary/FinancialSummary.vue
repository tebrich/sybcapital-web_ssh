<template>
  <div class="sb-mt-10">
    <v-row>
      <v-col cols="12" md="7">
        <financial-resume :symbol="$route.params.symbol" />
      </v-col>
      <v-divider vertical class="!sb-my-4" />
      <v-col cols="12" md="5">
        <financial-price-area :symbol="$route.params.symbol" />
      </v-col>
      <v-col cols="12" md="4">
        <financial-bars :symbol="$route.params.symbol" />
      </v-col>
      <v-divider vertical class="!sb-my-10" />
      <v-col cols="12" md="4">
        <financial-bubbles :symbol="$route.params.symbol" />
      </v-col>
      <v-divider vertical class="!sb-my-10" />
      <v-col cols="12" md="4">
        <financial-upgrades :symbol="$route.params.symbol" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import FinancialResume from '~/components/ticker/tabs/financial-summary/FinancialResume.vue'
import FinancialBars from '~/components/ticker/tabs/financial-summary/FinancialBars.vue'
import FinancialBubbles from '~/components/ticker/tabs/financial-summary/FinancialBubbles.vue'
import FinancialUpgrades from '~/components/ticker/tabs/financial-summary/FinancialUpgrades.vue'
import FinancialPriceArea from '~/components/ticker/tabs/financial-summary/FinancialPriceArea.vue'

export default defineComponent({
  name: 'FinancialSummary',
  components: { FinancialPriceArea, FinancialUpgrades, FinancialBubbles, FinancialBars, FinancialResume },
  setup() {
    return {}
  }
})
</script>

<style></style>
