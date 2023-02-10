<template>
  <div>
    <template v-if="category">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row>
        <v-col v-if="category.posts.length > 0" cols="12" md="8">
          <div class="sb-flex sb-flex-col">
            <preview-news-container
              v-for="(item, index) in category.posts"
              :key="index"
              :post="item"
              :small="$vuetify.breakpoint.mdAndUp"
            />
          </div>
        </v-col>
        <v-col v-else cols="12" md="8">
          <h2>Aún no tenemos posts para esta categoría!</h2>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="4">
          <div class="sb-py-3 sb-w-full">
            <subscribe-news-letter />
            <v-divider class="sb-py-5" />
            <markets-table />
          </div>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-skeleton-loader type="article" />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import PreviewNewsContainer from '~/components/stock/news/PreviewNewsContainer.vue'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'
import { useCategories } from '~/composables'
import { Categories } from '@/models'

export default defineComponent({
  // eslint-disable-next-line vue/match-component-file-name
  name: 'Slug',

  auth: false,

  components: { MarketsTable, SubscribeNewsLetter, PreviewNewsContainer },

  setup() {
    const categoriesComposable = useCategories()
    const route = useRoute()
    const router = useRouter()

    const breadcrumbs = ref([
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
    ])

    const { slug } = route.value.params
    if (!slug) {
      router.replace('/')
    }

    const category = ref<Categories>()

    const getCategoriesPost = async () => {
      category.value = await categoriesComposable.getOneBySlug(slug)
    }

    onMounted(() => {
      getCategoriesPost().finally(() => {
        if (category.value) {
          if (category.value.parent) {
            breadcrumbs.value.push({
              text: category.value?.parent.name,
              disabled: false,
              href: '/category/' + category.value?.parent.slug,
            })
          }

          breadcrumbs.value.push({
            text: category.value?.name,
            disabled: true,
            href: '/category/' + slug,
          })
        }
      })
    })

    return {
      category,
      breadcrumbs,
    }
  },
})
</script>

<style></style>
