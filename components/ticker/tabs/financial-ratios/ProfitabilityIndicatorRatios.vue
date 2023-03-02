<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Índices de Indicadores de Rentabilidad
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Margen de Beneficio Bruto
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ GrossProfit \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.grossProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Puede pensar en ello como la cantidad de dinero de las ventas del producto que queda después de que se hayan pagado todos los costos directos asociados con la fabricación del producto.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Margen de Beneficio Operativo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingIncome \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.operatingProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Si las empresas pueden ganar suficiente dinero con sus operaciones para apoyar el negocio, la empresa generalmente se considera más estable.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Margen de Beneficio Antes de Impuestos
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ IncomeBeforeTax \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.pretaxProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El margen de beneficio antes de impuestos (o margen EBT) es el porcentaje de ganancias retenidas por una empresa antes de cumplir con sus obligaciones tributarias requeridas con el gobierno estatal y federal. La fórmula de margen antes de impuestos se calcula dividiendo las ganancias de una empresa antes de impuestos (EBT) por sus ingresos.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Margen de Utilidad Neto
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.netProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          En general, un margen de beneficio neto superior al 10% se considera excelente, aunque depende de la industria y la estructura del negocio.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Tasa Impositiva Efectiva
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ ProvisionForIncomeTaxes \over IncomeBeforeTax $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.effectiveTaxRateTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          La tasa impositiva efectiva es una representación más precisa de la obligación tributaria total de una persona o corporación que su tasa impositiva marginal, y generalmente es más baja.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Rendimiento de los Activos
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over AverageTotalAssets $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnAssetsTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROA:  el rendimiento de los activos señala la intensidad de capital de la empresa, la cual dependerá de la industria o sector; Las empresas que requieren grandes inversiones iniciales generalmente tendrán un menor rendimiento de los activos. Los ROA superiores al 5%, generalmente se consideran buenos.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Retorno sobre el Capital
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over AverageTotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnEquityTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROE: esta relación, calcula cuánto dinero se gana en función de la inversión que realizan los inversionistas en la empresa. Los inversionistas, quieren ver un alto rendimiento sobre el capital, porque esto indica que la empresa está utilizando los fondos de sus inversiones de manera efectiva.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Rendimiento del Capital Empleado
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over AverageTotalAsset - AverageCurrentLiabilities $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnCapitalEmployedTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROCE, muestra a los inversionistas, cuántos dólares en ganancias genera cada dólar de capital empleado.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          NIperEBT
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over EBT $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          -
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          NIperEBT
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          EBT per EBIT
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over EBT - EBIT $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          -
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          EBTperEBIT
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          EBIT per Revenue
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          -
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          EBITperRevenue
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'ProfitabilityIndicatorRatios',

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

<style></style>
