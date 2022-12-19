<template>
  <div>
    <section>
      <v-row>
        <v-col v-for="(stockPrice, index) in featureStockPrices" :key="index" cols="3" class="sb-flex sb-items-center sb-justify-between">
          <feature-stock-price :values="stockPrice" />
          <div v-if="index !== featureStockPrices.length - 1" class="sb-h-[90px] sb-bg-black sb-border-r-[2px] sb-border-r-gray-500 sb-opacity-10" />
        </v-col>
      </v-row>
    </section>
    <section class="sb-my-8">
      <v-row align="stretch">
        <v-col cols="6">
          <preview-news-container />
        </v-col>
        <v-col cols="6">
          <preview-news-container v-for="(item, index) in 3" :key="index" small />
        </v-col>
      </v-row>
    </section>
    <section>
      <h1 class="sb-text-center sb-text-2xl sb-font-extrabold sb-mb-3">
        SyB Capital (SyBCapital.com) | Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra facilisis leo non volutpat. Donec ac justo placerat tortor tristique feugiat sed sed turpis. Aliquam et erat at mauris aliquam faucibus id eget quam. Duis diam diam, rutrum quis gravida sed, mattis id felis. Maecenas sed hendrerit diam. Mauris imperdiet lectus sollicitudin tortor commodo tincidunt.
      </p>
      <p>
        Praesent arcu mi, ultrices ac volutpat eu, porta quis mauris. Sed convallis tellus eget interdum iaculis. Nulla tristique eu lectus eu porttitor. Ut ac sem a velit ornare sodales. Aliquam quis pretium dui. Morbi dapibus faucibus velit, in luctus elit finibus sed. Nunc ac odio ac odio molestie aliquam. Donec ac sodales nunc. Fusce commodo suscipit purus, eget iaculis massa. Etiam a eleifend ex. Sed malesuada arcu sed nunc ultricies congue vel in tellus.
      </p>
    </section>
    <section>
      <v-row>
        <v-col cols="9">
          <preview-news-container v-for="(item, index) in 3" :key="index" small />
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import FeatureStockPrice from '~/components/stock/container/FeatureStockPrice.vue'
import PreviewNewsContainer from '~/components/stock/news/PreviewNewsContainer.vue'

export default defineComponent({
  name: 'Index',

  components: {
    FeatureStockPrice,
    PreviewNewsContainer
  },

  setup () {
    const featureStockPrices = [
      {
        name: 'S&P 500',
        price: '3,435.53',
        value: '-24.33',
        percetange: '-0.61',
        date: 'December 14, 2022',
        currency: 'USD',
        market: 'CBOE GLOBAL MARKETS'
      },
      {
        name: 'DOW 30',
        price: '32,808.31',
        value: '-393.91',
        percetange: '-1.19',
        date: 'December 16, 2022 2:55 PM EST',
        currency: 'USD',
        market: 'DOW JONES INDICES'
      },
      {
        name: 'NASDAQ',
        price: '10,672.10',
        value: '138.42',
        percetange: '1.28',
        date: 'December 16, 2022 2:55 PM EST',
        currency: 'USD',
        market: 'NASDAQ GIDS INDICES'
      },
      {
        name: 'VIX',
        price: '21.14',
        value: '-1.41',
        percetange: '-6.25',
        date: 'December 14, 2022',
        currency: 'USD',
        market: 'CBOE GLOBAL MARKETS'
      }
    ]

    return {
      featureStockPrices
    }
  },

  head: {
    title: 'Inicio'
  }
})
</script>
