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
        <table v-if="item.stockPrice" class="sb-w-full">
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
        <table v-else-if="isForex">
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Name:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.name }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              % Chag:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.changesPercentage }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Change:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.change }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Open:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ item.open }}
            </th>
          </tr>
          <tr>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-normal">
              Date:
            </th>
            <th class="sb-w-6/12 sb-text-left sb-text-sm sb-font-light">
              {{ getDate(item.timestamp) }}
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
        {{ item.stockPrice?.changesPercentage.toFixed(4) }}
      </div>
      <div
        v-else-if="item.stockPrice && item.stockPrice.changesPercentage < 0"
        class="sb-text-red-500"
      >
        {{ item.stockPrice?.changesPercentage.toFixed(4) }}
      </div>
      <div v-else class="sb-text-red-500">CLOSED</div>
    </template>
    <template #[`item.changesPercentage`]="{ item }">
      <div v-if="item.changesPercentage > 0" class="sb-text-green-600">
        {{ item.changesPercentage.toFixed(4) }}
      </div>
      <div v-else-if="item.changesPercentage < 0" class="sb-text-red-500">
        {{ item.changesPercentage.toFixed(4) }}
      </div>
      <div v-else class="sb-text-red-500">CLOSED</div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { StockMarketsMoversModel } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'PriceActivesList',

  props: {
    markets: {
      type: Array as () => StockMarketsMoversModel[],
      required: true,
    },
    isForex: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { isForex } = toRefs(props)
    const expanded = ref([])

    const activeHeaders = [
      { text: '', value: 'data-table-expand' },
      { text: 'Symbol', value: 'symbol' },
      { text: 'Price', value: 'price' },
    ]

    const getDate = (date: number) => {
      return dayjs(date * 1000).format('DD/MM/YYYY')
    }

    onBeforeMount(() => {
      if (isForex.value) {
        activeHeaders[1].value = 'name'
        activeHeaders.push({
          text: 'Change',
          value: 'changesPercentage',
        })
      } else {
        activeHeaders.push({
          text: 'Change',
          value: 'stockPrice.changesPercentage',
        })
      }
    })

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
