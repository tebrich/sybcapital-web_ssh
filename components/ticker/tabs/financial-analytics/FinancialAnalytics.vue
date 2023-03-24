<template>
  <div class="sb-py-10">
    <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
      <div class="sb-w-2/12 sb-text-sm">
        Indicador
      </div>
      <div class="sb-w-2/12 sb-text-[12px] sb-text-center">
        Lectura Actual
      </div>
      <div class="sb-w-2/12 sb-text-sm sb-text-center sb-text-center">
        Lectura Anterior
      </div>
      <div class="sb-w-2/12 sb-text-sm sb-text-center">
        Variación Pts
      </div>
      <div class="sb-w-2/12 sb-text-sm sb-text-center">
        Varicaión %
      </div>
      <div class="sb-w-2/12 sb-text-sm sb-text-center">
        Precio vs Indicador
      </div>
      <div class="sb-w-2/12 sb-text-sm sb-text-center">
        Fuerza
      </div>
    </div>
    <div v-if="analytics">
      <financial-table
        v-if="analytics.SmaMin"
        title="SMA (1 minuto)"
        :current="analytics.SmaMin.open"
        :old="analytics.SmaMin.close"
        :pc="analytics.SmaMin.sma"
        :strength="5"
      />
      <financial-table
        v-if="analytics.Sma1"
        title="SMA (1HORA)"
        middle
        :current="analytics.Sma1.open"
        :old="analytics.Sma1.close"
        :pc="analytics.Sma1.sma"
        :strength="10"
      />
      <financial-table
        v-if="analytics.Sma4"
        title="SMA(4 HORA)"
        :current="analytics.Sma4.open"
        :old="analytics.Sma4.close"
        :pc="analytics.Sma4.sma"
        :strength="25"
      />
      <financial-table
        v-if="analytics.Sma24"
        title="SMA (1 DIA)"
        middle
        :current="analytics.Sma24.open"
        :old="analytics.Sma24.close"
        :pc="analytics.Sma24.sma"
        :strength="45"
      />
      <financial-table
        v-if="analytics.WilliamsMin"
        title="Williams (1 minuto)"
        middle
        :current="analytics.WilliamsMin.open"
        :old="analytics.WilliamsMin.close"
        :pc="analytics.WilliamsMin.williams"
      />
      <financial-table v-if="analytics.Williams1" title="Williams (1HORA)" :current="analytics.Williams1.open" :old="analytics.Williams1.close" :pc="analytics.Williams1.williams" />
      <financial-table
        v-if="analytics.Williams4"
        title="Williams (4 HORA)"
        middle
        :current="analytics.Williams4.open"
        :old="analytics.Williams4.close"
        :pc="analytics.Williams4.williams"
      />
      <financial-table v-if="analytics.Williams24" title="Williams (1 DIA)" :current="analytics.Williams24.open" :old="analytics.Williams24.close" :pc="analytics.Williams24.williams" />
      <financial-table
        v-if="analytics.RsiMin"
        title="RSI (1 minuto)"
        middle
        :current="analytics.RsiMin.open"
        :old="analytics.RsiMin.close"
        :pc="analytics.RsiMin.rsi"
      />
      <financial-table v-if="analytics.Rsi1" title="RSI (1HORA)" :current="analytics.Rsi1.open" :old="analytics.Rsi1.close" :pc="analytics.Rsi1.rsi" />
      <financial-table
        v-if="analytics.Rsi4"
        title="RSI (4 HORA)"
        middle
        :current="analytics.Rsi4.open"
        :old="analytics.Rsi4.close"
        :pc="analytics.Rsi4.rsi"
      />
      <financial-table v-if="analytics.Rsi24" title="RSI (1 DIA)" :current="analytics.Rsi24.open" :old="analytics.Rsi24.close" :pc="analytics.Rsi24.rsi" />
      <financial-table
        v-if="analytics.AdxMin"
        title="ADX(1 minuto)"
        middle
        :current="analytics.AdxMin.open"
        :old="analytics.AdxMin.close"
        :pc="analytics.AdxMin.adx"
      />
      <financial-table v-if="analytics.Adx1" title="ADX(1HORA)" :current="analytics.Adx1.open" :old="analytics.Adx1.close" :pc="analytics.Adx1.adx" />
      <financial-table
        v-if="analytics.Adx4"
        title="ADX (4 HORA)"
        middle
        :current="analytics.Adx4.open"
        :old="analytics.Adx4.close"
        :pc="analytics.Adx4.adx"
      />
      <financial-table v-if="analytics.Adx24" title="ADX(1 DIA)" :current="analytics.Adx24.open" :old="analytics.Adx24.close" :pc="analytics.Adx24.adx" />
      <financial-table
        v-if="analytics.DsMin"
        title="DS (1 minuto)"
        middle
        :current="analytics.DsMin.open"
        :old="analytics.DsMin.close"
        :pc="analytics.DsMin.standardDeviation"
      />
      <financial-table v-if="analytics.Ds1" title="DS(1HORA)" :current="analytics.Ds1.open" :old="analytics.Ds1.close" :pc="analytics.Ds1.standardDeviation" />
      <financial-table
        v-if="analytics.Ds4"
        title="DS (4 HORA)"
        middle
        :current="analytics.Ds4.open"
        :old="analytics.Ds4.close"
        :pc="analytics.Ds4.standardDeviation"
      />
      <financial-table v-if="analytics.Ds24" title="DS(1 DIA)" :current="analytics.Ds24.open" :old="analytics.Ds24.close" :pc="analytics.Ds24.standardDeviation" />
    </div>
    <div v-else>
      <v-progress-linear indeterminate />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useRoute } from '@nuxtjs/composition-api'
import FinancialTable from '~/components/ticker/tabs/financial-analytics/FinancialTable.vue'
import { useStockPrices } from '~/composables'
import { FinancialAnalytics } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'FinancialAnalytics',
  components: { FinancialTable },
  setup() {
    const stockPriceComposable = useStockPrices()
    const route = useRoute()

    const symbol = route.value.params.symbol
    const analytics = ref<FinancialAnalytics | null>(null)

    const getFinancialAnalytics = async () => {
      analytics.value = await stockPriceComposable.getFinancialAnalytics(symbol)
    }

    onMounted(() => {
      getFinancialAnalytics()
    })

    return {
      analytics
    }
  }
})
</script>
