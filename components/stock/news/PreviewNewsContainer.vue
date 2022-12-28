<template>
  <a
    :href="`/post/${post.slug}`"
    :class="{
      'sb-flex sb-flex-row-reverse sb-items-center sb-justify-between sb-gap-3':
        small,
      'sb-h-full': !small,
    }"
    class="sb-border-b-[2px] sb-border-r-gray-500 sb-border-opacity-10 sb-py-3 !sb-text-black hover:sb-opacity-50"
  >
    <v-img
      v-if="file"
      :width="!small ? 580 : 260"
      :height="!small ? 300 : 140"
      class="sb-w-full"
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
        :class="[!small ? 'sb-text-3xl sb-my-2' : 'sb-text-xl sb-mb-2']"
      >
        {{ post.title }}
      </h2>
      <p
        v-if="post.excerpt"
        class="sb-font-light !sb-mb-2"
        :class="[!small ? 'sb-text-xl' : 'sb-text-sm']"
      >
        {{ post.excerpt }}
      </p>
      <div class="sb-flex sb-items-center sb-justify-start sb-gap-2">
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[
            !small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2',
          ]"
        >
          <v-icon :size="!small ? 14 : 10" color="primary"
            >mdi-share-variant-outline</v-icon
          >
          2 compartidos
        </span>
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[
            !small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2',
          ]"
        >
          <v-icon :size="!small ? 14 : 10" color="primary"
            >mdi-timer-outline</v-icon
          >
          3 min. de lectura
        </span>
        <span
          class="sb-flex sb-items-center sb-justify-center sb-font-light"
          :class="[
            !small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2',
          ]"
        >
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-calendar</v-icon>
          {{ getDate(post.createdAt) }}
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { computed } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { Files, Posts } from '~/models'

export default {
  name: 'PreviewNewsContainer',
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object as () => Posts,
      required: true,
    },
  },
  setup(props: any) {
    const file: any = computed(() =>
      props.post.files.find((file: Files) => file.feature)
    )

    const getDate = (date: Date) => {
      return dayjs(date).format('DD/MM/YYYY')
    }

    return {
      file,
      getDate,
    }
  },
}
</script>
