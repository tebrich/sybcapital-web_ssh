<template>
  <v-data-table
    :headers="activeHeaders"
    :items="desserts"
    class="elevation-1"
    hide-default-footer
    item-key="symbol"
    show-expand
    :expanded.sync="expanded"
    :single-expand="true"
  >
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about <strong>{{ item.symbol }}</strong>
      </td>
    </template>
    <template #[`item.chg`]="{item}">
      <div v-if="item.chg > 0" class="sb-text-green-600">
        {{ item.chg }}
      </div>
      <div v-else class="sb-text-red-600">
        {{ item.chg }}
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PriceActivesList',

  setup() {
    const expanded = ref([])

    const activeHeaders = [
      { text: '', value: 'data-table-expand' },
      { text: 'Symbol', value: 'symbol' },
      { text: 'Last', value: 'last' },
      { text: '$ Chg', value: 'chg' }
    ]

    const desserts = [
      {
        symbol: 'TSLA',
        last: 149.87,
        chg: -0.36
      },
      {
        symbol: 'QQQ',
        last: 269.75,
        chg: -3.8446
      },
      {
        symbol: 'SQQQ',
        last: 52.31,
        chg: 2.07
      }
    ]

    return {
      activeHeaders,
      desserts,
      expanded
    }
  }
})
</script>

<style>

</style>
