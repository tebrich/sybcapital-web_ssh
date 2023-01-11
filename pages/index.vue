<template>
  <div v-if="otherPosts.length > 0">
    <section
      v-if="
        stockMarkets.GSPC &&
        stockMarkets.IXIC &&
        stockMarkets.DJI &&
        stockMarkets.VIX
      "
    >
      <v-row>
        <v-col class="sb-flex sb-items-center sb-justify-between">
          <feature-stock-price :values="stockMarkets.GSPC" />
        </v-col>
        <v-col class="sb-flex sb-items-center sb-justify-between">
          <feature-stock-price :values="stockMarkets.IXIC" />
        </v-col>
        <v-col class="sb-flex sb-items-center sb-justify-between">
          <feature-stock-price :values="stockMarkets.DJI" />
        </v-col>
        <v-col class="sb-flex sb-items-center sb-justify-between">
          <feature-stock-price :values="stockMarkets.VIX" />
        </v-col>
      </v-row>
    </section>
    <section class="sb-my-8">
      <v-row align="stretch">
        <v-col cols="6">
          <h2 class="sb-mb-3 sb-text-2xl sb-font-bold">Ultimas entradas</h2>
          <preview-news-container :post="featuredPost" />
        </v-col>
        <v-col cols="6">
          <preview-news-container
            v-for="(item, index) in threePosts"
            :key="index"
            :post="item"
            small
          />
        </v-col>
      </v-row>
    </section>
    <section>
      <h1 class="sb-text-center sb-text-2xl sb-font-extrabold sb-mb-3">
        SyB Capital (SyBCapital.com) | Noticias de Mercado, Cotizaciones,
        Gráficos e Información Financiera
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra
        facilisis leo non volutpat. Donec ac justo placerat tortor tristique
        feugiat sed sed turpis. Aliquam et erat at mauris aliquam faucibus id
        eget quam. Duis diam diam, rutrum quis gravida sed, mattis id felis.
        Maecenas sed hendrerit diam. Mauris imperdiet lectus sollicitudin tortor
        commodo tincidunt.
      </p>
      <p>
        Praesent arcu mi, ultrices ac volutpat eu, porta quis mauris. Sed
        convallis tellus eget interdum iaculis. Nulla tristique eu lectus eu
        porttitor. Ut ac sem a velit ornare sodales. Aliquam quis pretium dui.
        Morbi dapibus faucibus velit, in luctus elit finibus sed. Nunc ac odio
        ac odio molestie aliquam. Donec ac sodales nunc. Fusce commodo suscipit
        purus, eget iaculis massa. Etiam a eleifend ex. Sed malesuada arcu sed
        nunc ultricies congue vel in tellus.
      </p>
    </section>
    <section>
      <v-row>
        <v-col cols="8">
          <preview-news-container
            v-for="(item, index) in otherPosts"
            :key="index"
            :post="item"
            small
          />
          <v-btn
            v-if="showLoadMore"
            ref="infiniteTarget"
            outlined
            loading
            large
            color="primary"
            class="!sb-block sb-mx-auto sb-my-5"
          ></v-btn>
        </v-col>
        <v-col cols="4">
          <div class="sb-py-3 sb-w-full">
            <subscribe-news-letter />
            <v-divider class="sb-py-5" />
            <div>
              <h3 class="sb-text-xl sb-font-bold sb-mb-2">
                NASDAQ Market Movers
              </h3>
              <price-actives-tabs />
            </div>
            <v-divider class="sb-py-5" />
            <div>
              <h3 class="sb-text-xl sb-font-bold sb-mb-2">
                NYSE Market Movers
              </h3>
              <price-actives-tabs />
            </div>
            <v-divider class="sb-py-5" />
            <div>
              <h3 class="sb-text-xl sb-font-bold sb-mb-2">OTC Market Movers</h3>
              <price-actives-tabs />
            </div>
          </div>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  onMounted,
  computed,
  watch,
} from '@nuxtjs/composition-api'
import { useElementVisibility } from '@vueuse/core'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import FeatureStockPrice from '~/components/stock/container/FeatureStockPrice.vue'
import PreviewNewsContainer from '~/components/stock/news/PreviewNewsContainer.vue'
import PriceActivesTabs from '~/components/stock/container/PriceActivesTabs.vue'

import { usePosts, useStockPrices } from '@/composables'
export default defineComponent({
  name: 'Index',

  components: {
    FeatureStockPrice,
    PreviewNewsContainer,
    SubscribeNewsLetter,
    PriceActivesTabs,
  },

  setup() {
    const page = ref(1)

    const postComposable = usePosts()
    const stockPriceComposable = useStockPrices()

    const getPosts = async () => {
      try {
        await postComposable.getAll({ limit: 20, page: page.value })
      } catch (e) {
        console.log(e)
      }
    }

    const getMarkets = async () => {
      try {
        await stockPriceComposable.getMartkets()
      } catch (e) {
        console.log(e)
      }
    }

    const getStockTable = async () => {
      try {
        await stockPriceComposable.getNASDAQ()
        await stockPriceComposable.getNYSE()
        await stockPriceComposable.getOTC()
      } catch (e) {
        console.log(e)
      }
    }

    const featuredPost = computed(() => postComposable.posts.value[0])
    const threePosts = computed(() => postComposable.posts.value.slice(1, 4))
    const otherPosts = computed(() => postComposable.posts.value.slice(4))

    const stockMarkets = computed(() => stockPriceComposable.stockMarkets.value)
    const NASDAQ = computed(() => stockPriceComposable.NASDAQ.value)
    const NYSE = computed(() => stockPriceComposable.NYSE.value)
    const OTC = computed(() => stockPriceComposable.OTC.value)

    onMounted(() => {
      getPosts()
      getMarkets()
      getStockTable()
    })

    const infiniteTarget = ref(null)
    const infiniteVisible = useElementVisibility(infiniteTarget)

    watch(
      () => infiniteVisible.value,
      async () => {
        if (infiniteVisible.value) {
          page.value++
          await postComposable.getAll({ limit: 20, page: page.value })
        }
      }
    )

    return {
      featuredPost,
      threePosts,
      otherPosts,
      infiniteTarget,
      showLoadMore: computed(() => postComposable.loadMorePosts.value),
      stockMarkets,
      NASDAQ,
      OTC,
      NYSE,
    }
  },

  head: {
    title: 'Inicio',
  },
})
</script>
