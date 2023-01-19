<template>
  <div class="sb-flex sb-items-center sb-h-full">
    <div class="sb-w-9/12">
      <v-text-field
        v-model="search"
        :label="
          searchType === 'Articulos'
            ? 'Buscar articulos (preciona enter para buscar)'
            : 'Buscar divisas (preciona enter para buscar)'
        "
        outlined
        dense
        hide-details
        height="60"
        @keydown.enter="searchByType"
      />
    </div>
    <div class="sb-w-2/12">
      <v-select
        v-model="searchType"
        :items="['Articulos', 'Divisas']"
        outlined
        hide-details
        height="60"
      />
    </div>
    <div class="sb-w-1/12">
      <v-btn
        icon
        class="sb-text-center sb-mx-auto !sb-block"
        @click="$emit('close')"
      >
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SearchMenu',

  setup(_, { emit }) {
    const router = useRouter()

    const searchType = ref('Articulos')
    const search = ref('')

    const searchByType = () => {
      emit('close')
      if (searchType.value === 'Articulos') {
        router.push(encodeURI(`/post?s=${search.value}`))
      } else {
        console.log('searching currencies')
      }
    }

    return {
      searchType,
      search,
      searchByType,
    }
  },
})
</script>

<style></style>
