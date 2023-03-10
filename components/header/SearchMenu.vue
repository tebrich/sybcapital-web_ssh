<template>
  <div class="sb-flex sb-items-center sb-h-full">
    <div class="sb-w-9/12">
      <v-text-field
        v-if="searchType === 'Articulos'"
        v-model="search"
        label="Buscar articulos (preciona enter para buscar)"
        outlined
        dense
        hide-details
        height="60"
        @keydown.enter="searchByType"
      />
      <v-autocomplete
        v-else
        v-model="symbol"
        outlined
        dense
        item-value="symbol"
        item-text="name"
        hide-details
        height="60"
        :items="financialSymbolsList"
        label="Buscar acción (preciona enter para buscar)"
        @change="goToSymbol"
        @keydown.enter="goToSymbol"
      />
    </div>
    <div class="sb-w-2/12">
      <v-select
        v-model="searchType"
        :items="['Ticker', 'Articulos']"
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
        <v-icon color="primary">
          mdi-close
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useRouter } from '@nuxtjs/composition-api'
import { useStockPrices } from '~/composables'

export default defineComponent({
  name: 'SearchMenu',

  setup(_, { emit }) {
    const router = useRouter()
    const useStockComposable = useStockPrices()

    const searchType = ref('Ticker')
    const search = ref('')
    const symbol = ref(null)
    const financialSymbolsList = ref<string[]>([])

    const searchByType = () => {
      emit('close')

      router.push(encodeURI(`/post?s=${search.value}`))
    }

    const goToSymbol = () => {
      emit('close')
      if (!symbol.value) { return }

      router.push(encodeURI(`/ticker/${symbol.value}`))
    }

    const getFinancialStatementSymbolLists = async () => {
      financialSymbolsList.value = await useStockComposable.getFinancialStatementSymbolLists()
    }

    onMounted(() => {
      getFinancialStatementSymbolLists()
    })

    return {
      searchType,
      search,
      searchByType,
      financialSymbolsList,
      goToSymbol,
      symbol
    }
  }
})
</script>

<style></style>
