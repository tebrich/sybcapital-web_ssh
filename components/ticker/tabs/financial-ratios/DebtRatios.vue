<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Debt Ratios
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Debt Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalLiabilities \over TotalAssets $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.debtRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The debt ratio tells us the degree of leverage used by the company.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Debt Equity Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalDebt \over TotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.debtEquityRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          This is a measurement of the percentage of the company’s balance sheet that is financed by suppliers, lenders, creditors and obligors versus what the shareholders have committed.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Long-term Debt to Capitalization
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ Long - TermDebt \over Long - TermDebt + ShareholdersEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.longTermDebtToCapitalizationTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          While a high capitalization ratio can increase the return on equity because of the tax shield of debt, a higher proportion of debt increases the risk of bankruptcy for a company.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Total Debt to Capitalization
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalDebt \over TotalDebt + ShareholdersEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.totalDebtToCapitalizationTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Capitalization ratio describes to investors the extent to which a company is using debt to fund its business and expansion plans.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Interest Coverage Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over InterestExpense $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.interestCoverageTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The lower a company’s interest coverage ratio is, the more its debt expenses burden the company.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Cash Flow to Debt Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingCashFlows \over TotalDebt $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashFlowToDebtRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The cash flow to debt ratio reveals the ability of a business to support its debt obligations from its operating cash flows.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Company Equity Multiplier
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ TotalAssets \over TotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.companyEquityMultiplierTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          This is a measure of financial leverage.
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
