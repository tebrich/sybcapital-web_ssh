<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Profitability Indicator Ratios
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Gross Profit Margin
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ GrossProfit \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.grossProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          You can think of it as the amount of money from product sales left over after all of the direct costs associated with manufacturing the product have been paid.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Operating Profit Margin
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ OperatingIncome \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.operatingProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          If companies can make enough money from their operations to support the business, the company is usually considered more stable.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Pretax Profit Margin
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ IncomeBeforeTax \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.pretaxProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Profit is the main goal of for-profit organizations. The goal is to make a profit through growth and to grow every year. As a result, one of the most important roles of the financial and investment analyst is to track and forecast profitability.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Net Profit Margin
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over Revenue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.netProfitMarginTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Generally, a net profit margin in excess of 10% is considered excellent, though it depends on the industry and the structure of the business.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Effective Tax Rate
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ ProvisionForIncomeTaxes \over IncomeBeforeTax $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.effectiveTaxRateTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          If there’s one takeaway, it should be that a company’s tax situation is all but a living, breathing organism in its own right.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Return On Assets
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over AverageTotalAssets $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnAssetsTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROA Return on assets gives an indication of the capital intensity of the company, which will depend on the industry; companies that require large initial investments will generally have lower return on assets. ROAs over 5% are generally considered good.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Return On Equity
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ NetIncome \over AverageTotalEquity $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnEquityTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROE this ratio calculates how much money is made based on the investors' investment in the company.investors want to see a high return on equity ratio because this indicates that the company is using its investors' funds effectively.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Return On Capital Employed
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EBIT \over AverageTotalAsset - AverageCurrentLiabilities $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.returnOnCapitalEmployedTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          ROCE shows investors how many dollars in profits each dollar of capital employed generates.
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
