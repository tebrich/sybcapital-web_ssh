<template>
  <v-container v-if="post">
    <h2 class="sb-text-5xl sb-font-bold">
      {{ post.title }}
    </h2>
    <p v-if="post.excerpt" class="sb-my-5 sb-text-2xl sb-font-light">
      {{ post.excerpt }}
    </p>
    <v-row>
      <v-col cols="8">
        <div
          class="sb-font-light sb-text-sm"
          :class="{ 'sb-mt-5': !post.excerpt }"
        >
          <span
            v-for="(item, index) in post.categories"
            :key="index"
            class="sb-capitalize"
          >
            {{ item.name }}
            <template v-if="index !== post.categories.length - 1">,</template>
          </span>
        </div>
        <div
          class="sb-flex sb-items-center sb-justify-between sb-gap-2 sb-my-3"
        >
          <div class="sb-flex sb-items-center sb-gap-2">
            <div>
              <v-icon size="14"> mdi-timer-outline </v-icon>
              <span class="sb-text-sm sb-font-extralight"
                >{{ readingTime(post.content) }} minutos de lectura</span
              >
            </div>
          </div>
          <div class="sb-flex sb-items-center sb-gap-3">
            <div>
              <strong>4</strong>
              <span class="sb-font-light">Compartidos</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-1">
              <v-icon size="16"> mdi-facebook </v-icon>
              <span class="sb-font-light">2</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-1">
              <v-icon size="16"> mdi-twitter </v-icon>
              <span class="sb-font-light">2</span>
            </div>
          </div>
        </div>
        <v-row class="!sb-my-3">
          <v-col cols="3">
            <div>
              <strong class="sb-text-sm">Publicado el:</strong>
              <p class="sb-text-xs sb-font-light">
                {{ getFormateDate(post.createdAt) }}
              </p>
            </div>
            <v-divider />
            <div class="sb-mt-3">
              <strong class="sb-text-sm">Autor:</strong>
              <p class="sb-text-xs sb-font-light">
                {{ post.author.fullName }}
              </p>
            </div>
            <v-divider v-if="post.tags.length > 0" />
            <div v-if="post.tags.length > 0" class="sb-mt-3">
              <div class="sb-text-sm sb-font-light">TAGS:</div>
              <p class="sb-text-xs sb-font-bold sb-leading-5">
                <span
                  v-for="(item, index) in post.tags"
                  :key="index"
                  class="sb-capitalize"
                >
                  {{ item.name }}
                  <template v-if="index !== post.tags.length - 1">,</template>
                </span>
              </p>
            </div>
            <v-divider />
            <div class="sb-mt-3">
              <strong class="sb-text-sm">Compartir:</strong>
              <div class="sb-flex sb-items-center sb-gap-2 sb-my-2">
                <v-icon size="16"> mdi-facebook </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Facebook</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">2</p>
              </div>
              <div class="sb-flex sb-items-center sb-gap-2 sb-my-2">
                <v-icon size="16"> mdi-twitter </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Twitter</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">2</p>
              </div>
              <div class="sb-flex sb-items-center sb-gap-2 sb-my-2">
                <v-icon size="16"> mdi-email-outline </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Mail</p>
              </div>
              <p class="sb-font-light sb-text-sm">
                Este post fue compartido <br />
                6 veces
              </p>
            </div>
          </v-col>
          <v-col cols="9">
            <div class="post-content" v-html="post.content"></div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <div class="sb-py-3 sb-w-full sb-mt-16">
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
            <h3 class="sb-text-xl sb-font-bold sb-mb-2">NYSE Market Movers</h3>
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
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  useRoute,
  useMeta,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import PriceActivesTabs from '~/components/stock/container/PriceActivesTabs.vue'
import { usePosts } from '~/composables'
import { Posts } from '~/models'
import 'dayjs/locale/es'

export default defineComponent({
  // eslint-disable-next-line vue/match-component-file-name
  name: 'PostSlug',

  components: {
    SubscribeNewsLetter,
    PriceActivesTabs,
  },

  setup() {
    const route = useRoute()
    const postComposable = usePosts()

    const slug = computed(() => route.value.params.slug)
    const post = computed<Posts | undefined>(() => postComposable.post.value)

    const getPost = async () => {
      await postComposable.getOneBySlug(slug.value)
    }

    const getFormateDate = (date: Date) => {
      return dayjs(date).locale('es').format('DD MMMM YYYY')
    }

    const readingTime = (text: string) => {
      const wpm = 225
      const words = text.trim().split(/\s+/).length
      return Math.ceil(words / wpm)
    }

    useMeta({
      title: slug.value
        .replaceAll('-', ' ')
        .replace(/(?:^|\s|["'([{])+\S/g, (match: string) =>
          match.toUpperCase()
        ),
    })

    onMounted(() => {
      getPost()
    })

    return {
      post,
      getFormateDate,
      readingTime,
    }
  },

  head: {},
})
</script>

<style scoped>
.post-content >>> ul {
  list-style: disc !important;
}
</style>
