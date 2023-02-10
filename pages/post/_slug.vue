<template>
  <v-container v-if="post">
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
          class="sb-block md:sb-flex sb-items-center sb-justify-between sb-gap-2 sb-my-3"
        >
          <div class="sb-flex sb-items-center sb-gap-2 sb-mb-2 md:sb-mb-0">
            <div>
              <v-icon size="14"> mdi-timer-outline </v-icon>
              <span class="sb-text-sm sb-font-extralight"
                >{{ readingTime(post.content) }} minutos de lectura</span
              >
            </div>
          </div>
          <div class="sb-flex sb-items-center sb-gap-3">
            <div>
              <strong>{{ totalShared }}</strong>
              <span class="sb-font-light">Compartidos</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-1">
              <v-icon size="16"> mdi-facebook </v-icon>
              <span class="sb-font-light">{{ post.shared.facebook }}</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-1">
              <v-icon size="16"> mdi-twitter </v-icon>
              <span class="sb-font-light">{{ post.shared.twitter }}</span>
            </div>
            <div class="sb-flex sb-items-center sb-gap-1">
              <v-icon size="16"> mdi-email-outline </v-icon>
              <span class="sb-font-light">{{ post.shared.email }}</span>
            </div>
          </div>
        </div>
        <v-row class="!sb-my-3">
          <v-col cols="12" md="3">
            <div class="sb-flex sb-items-start md:sb-block">
              <div class="sb-w-6/12 md:sb-w-full">
                <strong class="sb-text-sm">Publicado el:</strong>
                <p class="sb-text-xs sb-font-light">
                  {{ getFormateDate(post.createdAt) }}
                </p>
              </div>
              <v-divider v-if="$vuetify.breakpoint.mdAndUp" />
              <div
                class="sb-w-6/12 md:sb-w-full"
                :class="{ 'sb-mt-3': $vuetify.breakpoint.mdAndUp }"
              >
                <strong class="sb-text-sm">Autor:</strong>
                <p class="sb-text-xs sb-font-light">
                  {{ post.author.fullName }}
                </p>
              </div>
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
            <div v-if="$vuetify.breakpoint.mdAndUp" class="sb-mt-3">
              <strong class="sb-text-sm">Compartir:</strong>
              <a
                :href="`https://www.facebook.com/sharer.php?u=${currentUrl}`"
                target="_blank"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('facebook')"
              >
                <v-icon size="16"> mdi-facebook </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Facebook</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.facebook }}
                </p>
              </a>
              <a
                :href="`http://twitter.com/share?url=${currentUrl}`"
                target="_blank"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('twitter')"
              >
                <v-icon size="16"> mdi-twitter </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Twitter</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.twitter }}
                </p>
              </a>
              <a
                :href="`mailto:no-one@snai1mai1.com?body=${currentUrl}`"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('email')"
              >
                <v-icon size="16"> mdi-email-outline </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Mail</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.email }}
                </p>
              </a>
              <p class="sb-font-light sb-text-sm">
                Este post fue compartido <br />
                {{ totalShared }} veces
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <v-img
              v-if="post.files.length > 0"
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
            <div class="post-content" v-html="post.content"></div>
          </v-col>
          <v-col cols="12">
            <div v-if="$vuetify.breakpoint.mdAndDown" class="sb-mt-3">
              <strong class="sb-text-sm">Compartir:</strong>
              <a
                :href="`https://www.facebook.com/sharer.php?u=${currentUrl}`"
                target="_blank"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('facebook')"
              >
                <v-icon size="16"> mdi-facebook </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Facebook</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.facebook }}
                </p>
              </a>
              <a
                :href="`http://twitter.com/share?url=${currentUrl}`"
                target="_blank"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('twitter')"
              >
                <v-icon size="16"> mdi-twitter </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Twitter</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.twitter }}
                </p>
              </a>
              <a
                :href="`mailto:no-one@snai1mai1.com?body=${currentUrl}`"
                class="sb-flex sb-items-center sb-gap-2 sb-my-2 sb-cursor-pointer hover:sb-opacity-30 !sb-text-black"
                @click="updateShared('email')"
              >
                <v-icon size="16"> mdi-email-outline </v-icon>
                <p class="sb-text-sm sb-font-bold !sb-m-0">Mail</p>
                <p class="sb-text-sm sb-font-light !sb-m-0">
                  {{ post.shared.email }}
                </p>
              </a>
              <p class="sb-font-light sb-text-sm">
                Este post fue compartido <br />
                {{ totalShared }} veces
              </p>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4">
        <div class="sb-py-3 sb-w-full sb-mt-16">
          <subscribe-news-letter />
          <v-divider class="sb-py-5" />
          <markets-table />
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
  useRoute,
  useMeta,
  useStore,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import { usePosts, useStockPrices } from '~/composables'
import { Posts } from '~/models'
import 'dayjs/locale/es'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'

export default defineComponent({
  // eslint-disable-next-line vue/match-component-file-name
  name: 'PostSlug',

  auth: false,

  components: {
    MarketsTable,
    SubscribeNewsLetter,
  },

  setup() {
    const route = useRoute()
    const postComposable = usePosts()
    const store = useStore()

    const slug = computed(() => route.value.params.slug)
    const post = computed<Posts | undefined>(() => postComposable.post.value)
    const currentUrl = document.location.href

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

    const totalShared = computed(() => {
      if (post.value) {
        const { facebook, twitter, email } = post.value.shared
        return facebook + twitter + email
      }
      return 0
    })

    const updateShared = async (type: string) => {
      try {
        if (post.value && post.value.id) {
          await postComposable.updateShared(post.value.id, type)
          await getPost()
        }
      } catch (e) {
        console.log(e)
      }
    }

    useMeta(() => {
      if (post.value) {
        return {
          title:
            slug.value.replaceAll('-', ' ').charAt(0).toUpperCase() +
            slug.value.replaceAll('-', ' ').slice(1),
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: post.value?.excerpt,
            },
            {
              hid: 'og:title',
              property: 'og:title',
              content: post.value.title,
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: post.value?.excerpt,
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: post.value.files[0].url,
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: currentUrl,
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: post.value.title,
            },
            {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: post.value?.excerpt,
            },
            {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: post.value.files[0].url,
            },
            {
              hid: 'twitter:card',
              name: 'twitter:card',
              content: 'summary_large_image',
            },
          ],
        }
      }
      return {
        title:
          slug.value.replaceAll('-', ' ').charAt(0).toUpperCase() +
          slug.value.replaceAll('-', ' ').slice(1),
        meta: [
          {
            hid: 'og:title',
            property: 'og:title',
            content:
              slug.value.replaceAll('-', ' ').charAt(0).toUpperCase() +
              slug.value.replaceAll('-', ' ').slice(1),
          },
        ],
      }
    })

    onMounted(() => {
      getPost()
    })

    return {
      post,
      getFormateDate,
      readingTime,
      totalShared,
      currentUrl,
      updateShared,
      slug,
    }
  },

  head: {},
})
</script>

<style scoped>
.post-content >>> ul,
.post-content >>> ol {
  list-style: auto !important;
}
</style>
