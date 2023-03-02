<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Ratios de Rendimiento Operativo
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Rotación de Activos Fijos
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ Revenue \over NetPPE $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.fixedAssetTurnoverTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Calcula la eficiencia con la que una empresa produce ventas con sus máquinas y equipos.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Rotación de Activos
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ Revenue \over TotalAverageAssets $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.assetTurnoverTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de rotación de activos, a menudo se puede utilizar como un indicador de la eficiencia con la que una empresa está desplegando sus activos en la generación de ingresos.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'OperatingPerformanceRatios',

  filters: {
    formatNumber: (value: number) => {
      return value ? value.toFixed(2) : '-'
    }
  },

  props: {
    financialRatios: {
      type: Object as () => StockFinancialRatios,
      required: true
    }
  }
})
</script>
