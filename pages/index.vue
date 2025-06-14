<template>
  <div>
    <!-- 1) Stock Markets (si existen) -->
    <section v-if="Object.keys(stockMarkets).length">
      <v-row>
        <v-col cols="6" lg="3">
          <feature-stock-price :values="stockMarkets.GSPC" />
        </v-col>
        <v-col cols="6" lg="3">
          <feature-stock-price :values="stockMarkets.IXIC" />
        </v-col>
        <v-col cols="6" lg="3">
          <feature-stock-price :values="stockMarkets.DJI" />
        </v-col>
        <v-col cols="6" lg="3">
          <feature-stock-price :values="stockMarkets.VIX" />
        </v-col>
      </v-row>
    </section>

    <!-- 2) Artículo destacado -->
    <section v-if="featuredPost" class="sb-my-8">
      <v-row align="stretch">
        <v-col cols="12" md="6">
          <h2 class="sb-mb-3 sb-text-2xl sb-font-bold">Última Entrada</h2>
          <preview-news-container :post="featuredPost" />
        </v-col>
        <v-col cols="12" md="6">
          <div class="sb-flex sb-flex-col">
            <preview-news-container
              v-for="(item, index) in threePosts"
              :key="index"
              :post="item"
              :small="$vuetify.breakpoint.mdAndUp"
            />
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- 3) Resto de artículos -->
    <section v-if="otherPosts.length">
      <v-row>
        <v-col cols="12" md="8">
          <div class="sb-flex sb-flex-col">
            <preview-news-container
              v-for="(item, index) in otherPosts"
              :key="index"
              :post="item"
              :small="$vuetify.breakpoint.mdAndUp"
            />
          </div>
          <v-btn
            v-if="showLoadMore"
            ref="infiniteTarget"
            outlined
            loading
            large
            color="primary"
            class="!sb-block sb-mx-auto sb-my-5"
          >
            Cargar más
          </v-btn>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4">
          <div class="sb-py-3 sb-w-full">
            <subscribe-news-letter />
            <v-divider class="sb-py-5" />
            <markets-table />
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- 4) Mensaje fallback -->
    <section v-if="!threePosts.length && !otherPosts.length" class="sb-my-8">
      <p class="sb-text-center sb-text-lg">
        No hay más artículos por el momento.
      </p>
    </section>

    <!-- 5) Descripción estática -->
    <section class="sb-mb-8">
      <h1 class="sb-text-center sb-text-xl md:sb-text-2xl sb-font-extrabold sb-mb-3">
        SyB Capital (SyBCapital.com) | Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera
      </h1>
      <p class="sb-text-sm md:sb-text-xl">
        <a href="/" class="sb-text-primary">Sybcapital.com</a>, es una plataforma global de mercados financieros...
      </p>
      <!-- (continúa con tu texto) -->
    </section>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  defineComponent,
  computed,
  watch
} from '@nuxtjs/composition-api'
import { useElementVisibility } from '@vueuse/core'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import FeatureStockPrice from '~/components/stock/container/FeatureStockPrice.vue'
import PreviewNewsContainer from '~/components/stock/news/PreviewNewsContainer.vue'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'
import { usePosts, useStockPrices } from '@/composables'

export default defineComponent({
  name: 'IndexPage',
  auth: false, // si quieres que la home sea pública
  components: {
    SubscribeNewsLetter,
    FeatureStockPrice,
    PreviewNewsContainer,
    MarketsTable
  },
  setup() {
    const page = ref(1)
    const postComposable = usePosts()
    const stockPriceComposable = useStockPrices()

    // Carga inicial de datos
    onMounted(async () => {
      await postComposable.getAll({ limit: 20, page: page.value }).catch(() => {
        postComposable.posts.value = []
      })
      await stockPriceComposable.getMarkets().catch(() => {
        stockPriceComposable.stockMarkets.value = {}
      })
    })

    // Separación de posts
    const posts        = computed(() => postComposable.posts.value || [])
    const featuredPost = computed(() => posts.value[0] || null)
    const threePosts   = computed(() => posts.value.slice(1, 4))
    const otherPosts   = computed(() => posts.value.slice(4))

    // Stock markets
    const stockMarkets = computed(
      () => stockPriceComposable.stockMarkets.value || {}
    )

    // Infinite scroll
    const infiniteTarget  = ref(null)
    const infiniteVisible = useElementVisibility(infiniteTarget)
    watch(infiniteVisible, async (visible) => {
      if (visible) {
        page.value++
        await postComposable.getAll({ limit: 20, page: page.value })
      }
    })

    const showLoadMore = computed(() => postComposable.loadMorePosts.value)

    return {
      stockMarkets,
      featuredPost,
      threePosts,
      otherPosts,
      infiniteTarget,
      showLoadMore
    }
  }
})
</script>

<style scoped>
/* Estilos específicos si los necesitas */
</style>

