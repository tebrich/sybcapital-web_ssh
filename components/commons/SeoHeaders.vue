<template>
  <div></div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
export default {
  name: 'SeoHeaders',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  postData: { title: '', excerpt: '', files: [{ url: '' }] },

  async asyncData({ $axios }: Context) {
    // eslint-disable-next-line nuxt/no-this-in-fetch-data
    const data = await $axios.$get(`/posts/slug/${this.props.slug}`)

    return { postData: data }
  },

  head() {
    return {
      title: this.postData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.postData.excerpt,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.postData.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.postData.excerpt,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.postData.files[0].url,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.postData.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.postData.excerpt,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.postData.files[0].url,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
}
</script>

<style></style>
