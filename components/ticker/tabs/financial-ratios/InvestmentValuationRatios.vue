<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Investment Valuation Ratios
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Price Book Value Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over EquityperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceBookValueRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The price-to-book value ratio, expressed as a multiple (i.e. how many times a company's stock is trading per share compared to the company's book value per share), is an indication of how much shareholders are paying for the net assets of a company.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Price Cash Flow Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over OperatingCashFlowperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceCashFlowRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The price/cash flow ratio is used by investors to evaluate the investment attractiveness, from a value standpoint, of a company's stock.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Price Earnings Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over EPS $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceEarningsRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The financial reporting of both companies and investment research services use a basic earnings per share (EPS) figure divided into the current stock price to calculate the P/E multiple (i.e. how many times a stock is trading (its price) per each dollar of EPS).
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Price Earnings to Growth Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ PriceEarningsRatio \over ExpectedRevenueGrowth $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceEarningsToGrowthRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The PEG ratio is a refinement of the P/E ratio and factors in a stock's estimated earnings growth into its current valuation.The general consensus is that if the PEG ratio indicates a value of 1, this means that the market is correctly valuing (the current P/E ratio) a stock in accordance with the stock's current estimated earnings per share growth. If the PEG ratio is less than 1, this means that EPS growth is potentially able to surpass the market's current valuation. In other words, the stock's price is being undervalued. On the other hand, stocks with high PEG ratios can indicate just the opposite - that the stock is currently overvalued.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Price Sales Ratio
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over RevenueperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceSalesRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          The P/E ratio and P/S reflects how many times investors are paying for every dollar of a company's sales. Since earnings are subject, to one degree or another, to accounting estimates and management manipulation, many investors consider a company's sales (revenue) figure a more reliable ratio component in calculating a stock's price multiple than the earnings figure.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Dividend Yield
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DividendperShare \over StockPriceperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.dividendYieldTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Income investors value a dividend-paying stock, while growth investors have little interest in dividends, preferring to capture large capital gains. Whatever your investing style, it is a matter of historical record that dividend-paying stocks have performed better than non-paying-dividend stocks over the long term.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Enterprise Value Multiplier
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EntrepriseValue \over EBITDA $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.enterpriseValueMultipleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Overall, this measurement allows investors to assess a company on the same basis as that of an acquirer. As a rough calculation, enterprise value multiple serves as a proxy for how long it would take for an acquisition to earn enough to pay off its costs in years(assuming no change in EBITDA).
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Price Fair Value
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over IntrinsicValue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceFairValueTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Helps investors determine whether a stock is trading at, below, or above its fair value estimate,A price/fair value ratio below 1 suggests the stock is trading at a discount to its fair value, while a ratio above 1 suggests it is trading at a premium to its fair value.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'InvestmentValuationRatios',

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
