<template>
  <nuxt-link
    :to="`/post/${post.slug}`"
    class="sb-border-b-[2px] sb-border-r-gray-500 sb-border-opacity-10 sb-py-3 hover:sb-opacity-50"
    :class="{
      'sb-flex sb-flex-row-reverse sb-items-center sb-justify-between sb-gap-3': small,
      'sb-h-full !sb-mb-5': !small || $vuetify.breakpoint.mdAndDown
    }"
  >
    <v-img
      v-if="file"
      :width="!small ? 580 : 260"
      :height="!small ? 300 : 140"
      class="sb-w-full sb-block sb-mx-auto md:sb-mx-0"
      :class="[!small ? 'sb-h-[400px]' : 'sb-h-[140px]']"
      cover
      :src="file.url"
    />
    <v-img
      v-else
      :width="!small ? 580 : 260"
      :height="!small ? 300 : 140"
      class="sb-w-full sb-border-[1px] sb-border-gray-500 sb-border-opacity-10 sb-rounded"
      :class="[!small ? 'sb-h-[400px]' : 'sb-h-[140px]']"
      contain
      src="https://sybcapital-website.s3.sa-east-1.amazonaws.com/logo-color"
    />
    <div :class="{ 'sb-w-8/12': small }">
      <h2
        class="sb-font-bold"
        :class="[!small ? 'sb-text-xl md:sb-text-3xl sb-my-2' : 'sb-text-xl sb-mb-2']"
      >
        {{ post.title }}
      </h2>
      <p
        v-if="post.excerpt && $vuetify.breakpoint.mdAndUp"
        class="sb-font-light !sb-mb-2"
        :class="[!small ? 'sb-text-xl' : 'sb-text-sm']"
        v-html="post.excerpt"
      ></p>
      <div class="sb-flex sb-items-center sb-justify-start sb-gap-2">
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[!small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']"
        >
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-share-variant-outline</v-icon>
          {{ totalShared }} compartidos
        </span>
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[!small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']"
        >
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-timer-outline</v-icon>
          {{ readingTime(post.content) }} min. de lectura
        </span>
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[!small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']"
        >
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-calendar</v-icon>
          {{ getDate(post.createdAt) }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useStore, useRouter } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { Posts } from '~/models'

export default defineComponent({
  name: 'PreviewNewsContainer',
  props: {
    small: { type: Boolean, default: false },
    post: { type: Object as () => Posts, required: true }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    // Si el post tiene imágenes, tomo la primera; si no, será null
    const file = computed(() =>
      props.post.files && props.post.files.length ? props.post.files[0] : null
    )

    // Sumo las comparticiones de todas las redes
    const totalShared = computed(() => {
      const s = props.post.shared || { facebook: 0, twitter: 0, email: 0 }
      return (s.facebook || 0) + (s.twitter || 0) + (s.email || 0)
    })

    // Estimación rápida de tiempo de lectura
    const readingTime = (text: string) => {
      const wpm = 225
      return Math.ceil(text.trim().split(/\s+/).length / wpm)
    }

    // Formateo de la fecha
    const getDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

    return { file, totalShared, readingTime, getDate }
  }
})
</script>

<style scoped>
/* Si tenías estilos adicionales, ponlos aquí */
</style>

