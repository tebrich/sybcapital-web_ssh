<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Liquidity Measurement Ratios
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Current Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CurrentAssets \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.currentRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          A current ratio of 1.0 or greater is an indication that the company is well-positioned to cover its current or short-term liabilities.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Quick Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CashandCashEquivalents + ShortTermInvestments + AccountReceivables \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.quickRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The quick ratio is more conservative than the current ratio because it excludes inventory and other current assets, which generally are more difficult to turn into cash. A higher quick ratio means a more liquid current position.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Cash Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CashandCashEquivalents \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The cash ratio is almost like an indicator of a firm’s value under the worst-case scenario where the company is about to go out of business.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Days of Sales Outstanding
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(AccountReceivable(start) + AccountReceivable(end)) / 2 \over Revenue / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfSalesOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          DSO tells you how many days after the sale it takes people to pay you on average.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Days of Inventory Outstanding
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(Inventories(start) + Inventories(end)) / 2 \over Revenue / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfInventoryOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          DIO tells you how many days inventory sits on the shelf on average.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Operating Cycle
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DSO + DIO $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.operatingCycleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          (DSO + DIO )Basically the Operating Cycle tells you how many days it takes for something to go from first being in inventory to receiving the cash after the sale.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Days of Payables Outstanding
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(AccountsPayable(start) + AccountsPayable(end)) / 2 \over COGS / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfPayablesOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          DPO tells you how many days the company takes to pay its suppliers.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Cash Conversion Cycle
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DSO + DIO - DPO $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashConversionCycleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          DPO tells you how many days the company takes to pay its suppliers.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'LiquidityMeasurementRatios',

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

<style>

</style>
