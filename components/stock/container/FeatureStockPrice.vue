<template>
  <div class="sb-w-full">
    <h2
      class="sb-text-sm md:sb-text-lg sb-font-bold sb-w-full sb-bg-gray-200 sb-px-3"
    >
      {{ values.name }}
    </h2>
    <div
      class="sb-flex sb-flex-col md:sb-flex-row sb-items-start md:sb-items-center sb-gap-2 sb-my-2"
    >
      <span class="sb-text-sm md:sb-text-lg">{{ values.price }}</span>
      <div
        v-if="values.price > values.open"
        class="sb-flex sb-items-center sb-gap-1"
      >
        <v-icon color="green" :size="$vuetify.breakpoint.mdAndUp ? 25 : 20">
          mdi-arrow-up-bold-circle
        </v-icon>
        <span class="sb-text-green-600 sb-text-sm md:sb-text-lg">
          +{{ values.change.toFixed(2) }} (+{{
            values.changesPercentage.toFixed(2)
          }}%)
        </span>
      </div>
      <div v-else class="sb-flex sb-items-center sb-gap-1">
        <v-icon color="red" :size="$vuetify.breakpoint.mdAndUp ? 25 : 20">
          mdi-arrow-down-bold-circle
        </v-icon>
        <span class="sb-text-red-600 sb-text-sm md:sb-text-lg">
          {{ values.change.toFixed(2) }}
          ({{ values.changesPercentage.toFixed(2) }}%)
        </span>
      </div>
    </div>
    <p class="sb-p-0 !sb-m-0 sb-text-[10px] sb-font-light">
      {{ getDate(values.timestamp) }}
    </p>
    <div class="sb-text-[10px] sb-font-light">
      USD | {{ values.name }} | {{ values.exchange }}
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { StockPricesModel } from '~/models/stock-prices.model'
export default {
  name: 'FeatureStockPrice',
  props: {
    values: {
      type: Object as () => StockPricesModel,
      required: true,
    },
  },
  setup() {
    const getDate = (date: number) => {
      // Get date from timestamp
      return dayjs(date * 1000).format('MMM DD, YYYY')
    }

    return {
      getDate,
    }
  },
}
</script>

<style></style>
