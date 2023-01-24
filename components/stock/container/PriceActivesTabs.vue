<template>
  <v-card elevation="2">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="#ED3237"
      centered
    >
      <v-tab> Actives </v-tab>
      <v-tab> Gainers </v-tab>
      <v-tab> Decliners </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <price-actives-list :markets="markets" />
      </v-tab-item>
      <v-tab-item>
        <price-actives-list :markets="gainers" />
      </v-tab-item>
      <v-tab-item>
        <price-actives-list :markets="decliners" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@nuxtjs/composition-api'
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

  setup(props) {
    const { markets } = toRefs(props)

    const tab = ref(null)

    const gainers = computed(() =>
      markets.value.filter((market) => market.stockPrice?.changesPercentage > 0)
    )
    const decliners = computed(() =>
      markets.value.filter((market) => market.stockPrice?.changesPercentage < 0)
    )

    return {
      tab,
      gainers,
      decliners,
    }
  },
})
</script>

<style></style>
