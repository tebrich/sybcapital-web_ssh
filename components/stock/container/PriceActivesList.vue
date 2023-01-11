<template>
  <v-data-table
    :headers="activeHeaders"
    :items="markets"
    class="elevation-1"
    hide-default-footer
    item-key="symbol"
    show-expand
    :expanded.sync="expanded"
    :single-expand="true"
  >
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <table class="sb-w-full" v-if="item.stockPrice">
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Company:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.companyName }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              % Chag:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.stockPrice.changesPercentage }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Change:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.stockPrice.change }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Open:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.stockPrice.open }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Date:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ getDate(item.stockPrice.timestamp) }}
            </th>
          </tr>
        </table>
        <span v-else>CLOSED</span>
      </td>
    </template>
    <template #[`item.stockPrice.changesPercentage`]="{ item }">
      <div
        v-if="item.stockPrice && item.stockPrice.changesPercentage > 0"
        class="sb-text-green-600"
      >
        {{ item.stockPrice?.changesPercentage }}
      </div>
      <div
        v-else-if="item.stockPrice && item.stockPrice.changesPercentage <= 0"
        class="sb-text-red-500"
      >
        {{ item.stockPrice?.changesPercentage }}
      </div>
      <div v-else>CLOSED</div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { StockMarketsMoversModel } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'PriceActivesList',

  props: {
    markets: {
      type: Array as () => StockMarketsMoversModel[],
      required: true,
    },
  },

  setup() {
    const expanded = ref([])

    const activeHeaders = [
      { text: '', value: 'data-table-expand' },
      { text: 'Symbol', value: 'symbol' },
      { text: 'Price', value: 'price' },
      { text: '%', value: 'stockPrice.changesPercentage' },
    ]

    const getDate = (date: number) => {
      return dayjs(date * 1000).format('DD/MM/YYYY')
    }

    return {
      activeHeaders,
      getDate,
      expanded,
    }
  },
})
</script>

<style scoped>
tr th {
  padding: 7px 0;
}
</style>
