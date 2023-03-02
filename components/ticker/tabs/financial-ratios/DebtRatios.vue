<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Ratios de Endeudamiento
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Deuda
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalLiabilities \over TotalAssets $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.debtRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de endeudamiento, nos indica el grado de apalancamiento utilizado por la empresa.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Deuda de Capital
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalDebt \over TotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.debtEquityRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Esta es una medida del porcentaje del balance de la empresa que es financiado por proveedores, prestamistas, acreedores y deudores frente a lo que los accionistas se han comprometido.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Capitalización de la Deuda a Largo Plazo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ Long - TermDebt \over Long - TermDebt + ShareholdersEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.longTermDebtToCapitalizationTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Mientras que un alto índice de capitalización puede aumentar el rendimiento del capital debido al proteccionismo fiscal de la deuda, una mayor proporción de deuda aumenta el riesgo de quiebra para una empresa.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Capitalización de la Deuda Total
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalDebt \over TotalDebt + ShareholdersEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.totalDebtToCapitalizationTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de capitalización señala a los inversionistas la medida en que una empresa está utilizando la deuda para financiar sus planes comerciales y de expansión.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Cobertura de Intereses
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over InterestExpense $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.interestCoverageTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El coeficiente de cobertura de intereses, mide la capacidad de una empresa para manejar su deuda pendiente. El término "cobertura", se refiere a la duración del tiempo, normalmente, el número de años fiscales para el cual se pueden hacer pagos de intereses con las ganancias disponibles actualmente de la compañía. En términos más simples, representa cuántas veces la empresa puede pagar sus obligaciones utilizando sus ganancias
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          La relación flujo de efectivo a deuda revela la capacidad de una empresa para respaldar sus obligaciones de deuda de sus flujos de efectivo operativos.
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlows \over TotalDebt $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashFlowToDebtRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Ratio de Flujo de Caja a Deuda
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Esta es una medida de apalancamiento financiero.
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalAssets \over TotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.companyEquityMultiplierTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Multiplicador del Capital de la Empresa
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'DebtRatios',

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
