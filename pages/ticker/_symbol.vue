<template>
  <v-card elevation="0">
    <div v-if="companyData" class="sb-mb-5 sb-flex sb-items-center sb-gap-5">
      <div>
        <v-img
          v-if="$vuetify.breakpoint.mdAndUp"
          :src="`https://financialmodelingprep.com/image-stock/${$route.params.symbol}.png`"
          width="40"
          height="40"
          contain
          class="rounded-sm"
        />
        <v-img
          v-else
          :src="`https://financialmodelingprep.com/image-stock/${$route.params.symbol}.png`"
          width="30"
          height="30"
          contain
          class="rounded-sm"
        />
      </div>
      <h2 class="sb-text-sm md:sb-text-xl sb-font-bold">
        {{ companyData.name }} ({{ $route.params.symbol }})
      </h2>
      <h2 class="sb-text-sm md:sb-text-xl sb-font-bold" :class="[companyData.change > 0 ? 'sb-text-green-500' : 'sb-text-red-500']">
        <span class="sb-text-black">${{ companyData.price }}</span> {{ companyData.change > 0 ? '+' : '' }}{{ companyData.change }} ({{ companyData.changesPercentage > 0 ? '+' : '' }}{{ companyData.changesPercentage | formatNumber }}%)
      </h2>
    </div>
    <v-tabs v-model="tab" color="primary">
      <v-tab value="financial-summary">
        Resumen Financiero
      </v-tab>
      <v-tab value="financial-ratios">
        Ratios Financieros
      </v-tab>

      <v-tab-item>
        <financial-summary />
      </v-tab-item>
      <v-tab-item>
        <financial-ratios />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted, useRoute } from '@nuxtjs/composition-api'
import FinancialRatios from '~/components/ticker/tabs/financial-ratios/FinancialRatios.vue'
import { useStockPrices } from '~/composables'
import FinancialSummary from '~/components/ticker/tabs/financial-summary/FinancialSummary.vue'

export default defineComponent({
  // eslint-disable-next-line vue/match-component-file-name
  name: 'TickerSymbol',
  components: { FinancialSummary, FinancialRatios },

  auth: false,

  filters: {
    formatNumber(value) {
      return value ? value.toFixed(2) : 0
    }
  },

  setup() {
    const route = useRoute()
    const useStockComposable = useStockPrices()

    const tab = ref('financial-ratios')
    const companyData = computed(() => useStockComposable.companyData.value)

    const getCompanyData = async () => {
      await useStockComposable.getCompanyData(route.value.params.symbol)
    }

    onMounted(() => {
      getCompanyData()
    })

    return {
      tab,
      companyData
    }
  }
})
</script>

<style></style>
