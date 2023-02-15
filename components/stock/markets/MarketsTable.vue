<template>
  <div>
    <div>
      <h3 class="sb-text-xl sb-font-bold sb-mb-2">NASDAQ Market Movers</h3>
      <price-actives-tabs :markets="NASDAQ" />
    </div>
    <v-divider class="sb-py-5" />
    <div>
      <h3 class="sb-text-xl sb-font-bold sb-mb-2">NYSE Market Movers</h3>
      <price-actives-tabs :markets="NYSE" />
    </div>
    <v-divider class="sb-py-5" />
    <div>
      <h3 class="sb-text-xl sb-font-bold sb-mb-2">Forex Actives Prices</h3>
      <price-actives-tabs :markets="FOREX" is-forex />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import PriceActivesTabs from '~/components/stock/container/PriceActivesTabs.vue'
import { useStockPrices } from '~/composables'

export default defineComponent({
  name: 'MarketsTable',
  components: { PriceActivesTabs },
  setup() {
    const stockPriceComposable = useStockPrices()

    const getStockTable = async () => {
      try {
        await stockPriceComposable.getNASDAQ()
        await stockPriceComposable.getNYSE()
        await stockPriceComposable.getForex()
      } catch (e) {
        console.log(e)
      }
    }

    const NASDAQ = computed(() => stockPriceComposable.NASDAQ.value)
    const NYSE = computed(() => stockPriceComposable.NYSE.value)
    const FOREX = computed(() => stockPriceComposable.FOREX.value)

    onMounted(() => {
      getStockTable()
    })

    return {
      NASDAQ,
      NYSE,
      FOREX,
    }
  },
})
</script>

<style></style>
