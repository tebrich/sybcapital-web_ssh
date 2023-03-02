<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Ratios de Indicadores de Flujo de Caja
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Ratio de Ventas de Flujo de Caja Operativo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlow \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.operatingCashFlowSalesRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Da a los inversionistas una idea de la capacidad de la empresa para convertir las ventas en efectivo.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Caja de Flujo Libre Operativo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ FreeCashFlow \over OperatingCashFlow $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.freeCashFlowOperatingCashFlowRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Cuanto mayor sea el porcentaje de flujo de efectivo libre incorporado en el flujo de efectivo operativo de una empresa, mayor será la fortaleza financiera de la empresa.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índices de Cobertura de Flujo de Efectivo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlow \over TotalDebt $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashFlowCoverageRatiosTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El flujo de caja operativo es simplemente la cantidad de efectivo generado por la empresa a partir de sus operaciones principales, que se utilizan para mantener el negocio financiado.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Cobertura a Corto Plazo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlow \over Short − TermDebt $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.shortTermCoverageRatiosTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de cobertura de deuda a corto plazo compara la suma de los préstamos a corto plazo de una empresa y la parte actual de su deuda a largo plazo con el flujo de caja operativo.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Cobertura de Gastos de Capital
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlow \over CapitalExpenditure $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.capitalExpenditureCoverageRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Cuanto mayor sea la cobertura de flujo de efectivo operativo para estos ítems, mayor será la capacidad de la compañía para cumplir con sus obligaciones, además de darle a la compañía más flujo de efectivo para expandir su negocio, soportar tiempos difíciles y no verse agobiada por el servicio de la deuda y las restricciones típicamente incluidas en los contratos de crédito.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Pago Dividendo e Índice de Cobertura Capex
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlow \over DividendPaid + CapitalExpenditure $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.dividendPaidAndCapexCoverageRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Para los inversionistas conservadores, centrados en la cobertura del flujo de efectivo, comparar la suma de los gastos de capital y los dividendos en efectivo de una empresa con su flujo de efectivo operativo es una medida estricta que pone el flujo de efectivo a la prueba definitiva. Si una empresa es capaz de cubrir estos dos desembolsos de fondos de fuentes internas y todavía le queda efectivo, está produciendo lo que podría llamarse "flujo de caja libre con esteroides". Esta circunstancia supone una calidad de inversión altamente favorable.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índices de Pago de Dividendos
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DPS(DividendperShare) \over EPS(NetIncomeperShareNumber $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          -
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de pago de dividendos es un indicador de qué tan bien las ganancias respaldan el pago de dividendos.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'CashFlowIndicatorRatios',

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
