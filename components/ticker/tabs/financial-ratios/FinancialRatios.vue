<template>
  <div v-if="financialRatios" class="sb-min-w-[1100px] sb-overflow-x-scroll md:sb-overflow-hidden">
    <liquidity-measurement-ratios :financial-ratios="financialRatios" />
    <profitability-indicator-ratios :financial-ratios="financialRatios" />
    <debt-ratios :financial-ratios="financialRatios" />
    <operating-performance-ratios :financial-ratios="financialRatios" />
    <cash-flow-indicator-ratios :financial-ratios="financialRatios" />
    <investment-valuation-ratios :financial-ratios="financialRatios" />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, useMeta, useRoute } from '@nuxtjs/composition-api'
import LiquidityMeasurementRatios from '~/components/ticker/tabs/financial-ratios/LiquidityMeasurementRatios.vue'
import ProfitabilityIndicatorRatios from '~/components/ticker/tabs/financial-ratios/ProfitabilityIndicatorRatios.vue'
import DebtRatios from '~/components/ticker/tabs/financial-ratios/DebtRatios.vue'
import OperatingPerformanceRatios from '~/components/ticker/tabs/financial-ratios/OperatingPerformanceRatios.vue'
import CashFlowIndicatorRatios from '~/components/ticker/tabs/financial-ratios/CashFlowIndicatorRatios.vue'
import InvestmentValuationRatios from '~/components/ticker/tabs/financial-ratios/InvestmentValuationRatios.vue'
import { useStockPrices } from '~/composables'

export default defineComponent({
  name: 'FinancialRatios',

  components: { InvestmentValuationRatios, CashFlowIndicatorRatios, OperatingPerformanceRatios, DebtRatios, ProfitabilityIndicatorRatios, LiquidityMeasurementRatios },

  auth: false,

  setup() {
    const route = useRoute()
    const useStockComposable = useStockPrices()

    const financialRatios = computed(() => useStockComposable.financialRatios.value)

    const getFinancialRatios = async () => {
      await useStockComposable.getFinancialRatios(route.value.params.symbol)
    }

    onMounted(() => {
      getFinancialRatios()
    })

    useMeta({
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    })

    return {
      financialRatios
    }
  },

  head: {}
})
</script>

<style></style>
