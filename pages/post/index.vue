<template>
  <v-row>
    <v-col cols="8">
      <preview-news-container
        v-for="(item, index) in posts"
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
        <markets-table />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import PreviewNewsContainer from '~/components/stock/news/PreviewNewsContainer.vue'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'
import { usePosts } from '~/composables'

export default defineComponent({
  name: 'Index',
  auth: false,
  components: { MarketsTable, SubscribeNewsLetter, PreviewNewsContainer },
  setup() {
    const postsComposable = usePosts()
    const route = useRoute()
    const router = useRouter()

    const showLoadMore = ref(true)
    const limit = ref(20)
    const page = ref(1)

    const s = computed(() => route.value.query.s)
    if (!s.value) {
      router.replace('/')
    }

    const posts = computed(() => postsComposable.posts.value)

    const getPosts = async () => {
      await postsComposable.getAll({
        limit: limit.value,
        page: page.value,
        title: s.value,
      })
    }

    onMounted(() => {
      getPosts()
    })

    watch(s.value, () => {
      getPosts()
    })

    return {
      showLoadMore,
      posts,
    }
  },
})
</script>

<style></style>
