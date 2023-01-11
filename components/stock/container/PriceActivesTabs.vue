<template>
  <v-card elevation="2">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="#ED3237"
      centered
    >
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <price-actives-list :markets="markets" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PriceActivesList from './PriceActivesList.vue'
import { StockMarketsMoversModel } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'PriceActivesTabs',

  components: { PriceActivesList },

  props: {
    markets: {
      type: Array as () => StockMarketsMoversModel[],
      required: true,
    },
  },

  setup() {
    const tab = ref(null)
    const items = ['Actives', 'Gainers', 'Decliners']
    return {
      tab,
      items,
    }
  },
})
</script>

<style></style>
