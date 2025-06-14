<template>
  <v-container v-if="post">
    <!-- Título y extracto -->
    <h2 class="sb-text-xl md:sb-text-3xl lg:sb-text-5xl sb-font-bold">
      {{ post.title }}
    </h2>
    <p
      v-if="post.excerpt"
      class="sb-my-5 sb-text-2xl sb-font-light"
      v-html="post.excerpt"
    />

    <v-row>
      <v-col cols="12" md="8">
        <!-- Categorías, fecha y autor -->
        <div class="sb-font-light sb-text-sm sb-mb-3">
          <span
            v-for="(cat, i) in post.categories"
            :key="i"
            class="sb-capitalize"
          >
            {{ cat.name }}<span v-if="i + 1 < post.categories.length">, </span>
          </span>
        </div>
        <div class="sb-flex sb-items-center sb-justify-between sb-mb-6">
          <div class="sb-flex sb-items-center sb-gap-2">
            <v-icon size="14">mdi-timer-outline</v-icon>
            <span class="sb-text-sm sb-font-light">
              {{ readingTime(post.content) }} min de lectura
            </span>
          </div>
          <div class="sb-flex sb-items-center sb-gap-4">
            <div>
              <strong class="sb-text-sm">Publicado:</strong>
              <p class="sb-text-xs sb-font-light">
                {{ formatDate(post.createdAt) }}
              </p>
            </div>
            <div>
              <strong class="sb-text-sm">Autor:</strong>
              <p class="sb-text-xs sb-font-light">
                {{ post.author.fullName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Imagen principal -->
        <v-img
          v-if="post.files?.length"
          :src="post.files[0].url"
          class="sb-w-full sb-h-80 sb-mb-5"
          cover
        />
        <v-img
          v-else
          src="https://sybcapital-website.s3.sa-east-1.amazonaws.com/logo-color"
          class="sb-w-full sb-h-80 sb-mb-5"
          contain
        />

        <!-- Contenido -->
        <div class="post-content" v-html="post.content"></div>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <div class="sb-mb-6">
 	  <strong class="sb-text-sm">Compartido:</strong>

  	  <!-- solo renderizamos estas líneas si `post.shared` NO es null -->
          <template v-if="post.shared">
            <div class="sb-flex sb-items-center sb-gap-4 sb-mt-2">
              <v-icon size="16">mdi-facebook</v-icon>
              <span>{{ post.shared.facebook || 0 }}</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-4 sb-mt-2">
              <v-icon size="16">mdi-twitter</v-icon>
              <span>{{ post.shared.twitter || 0 }}</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-4 sb-mt-2">
              <v-icon size="16">mdi-email-outline</v-icon>
              <span>{{ post.shared.email || 0 }}</span>
            </div>
            <p class="sb-font-light sb-text-sm sb-mt-4">
              Total: {{ totalShared }} veces
            </p>
          </template>
          <!-- si post.shared es null, mostramos un placeholder -->
          <p v-else class="sb-text-sm sb-font-light sb-mt-2">
            Aún no compartido
         </p>
       </div>

        <subscribe-news-letter />
        <v-divider class="sb-my-6" />
        <markets-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useMeta,
  computed,
  useRoute
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { usePosts } from '~/composables'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'

export default defineComponent({
  name: 'PostSlug',
  head: {}, 
  components: { SubscribeNewsLetter, MarketsTable },
  auth: false,

  setup() {
    const route = useRoute()
    const posts = usePosts()
    const slug = computed(() => route.value.params.slug as string)

    // Carga el post (SSR + cliente)
    useFetch(async () => {
      await posts.getOneBySlug(slug.value)
    })

    const post = computed(() => posts.post.value)

    // Meta dinámicos (head tags)
    useMeta({
      title: post.value?.title || 'Cargando…',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: post.value?.excerpt || ''
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: post.value?.title || ''
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: post.value?.excerpt || ''
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            post.value?.files?.[0]?.url ||
            'https://sybcapital-website.s3.sa-east-1.amazonaws.com/logo-color'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://www.sybcapital.com/post/${slug.value}`
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ]
    })

    // Helpers
    const formatDate = (d: string) =>
      dayjs(d).locale('es').format('DD MMMM YYYY')
    const readingTime = (t: string) =>
      Math.ceil(t.split(/\s+/).length / 225)
    const totalShared = computed(() => {
      const s = post.value?.shared || { facebook: 0, twitter: 0, email: 0 }
      return (s.facebook || 0) + (s.twitter || 0) + (s.email || 0)
    })

    return {
      post,
      formatDate,
      readingTime,
      totalShared
    }
  }
})
</script>

<style scoped>
.post-content >>> ul,
.post-content >>> ol {
  list-style: auto !important;
}
</style>

