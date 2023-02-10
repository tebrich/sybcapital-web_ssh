<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    fixed
    temporary
    right
    width="350"
    class="sb-px-5"
  >
    <div class="sb-py-3 sb-pb-5 sb-w-full">
      <h2 class="sb-text-center sb-font-light sb-text-xl sb-mb-10 sb-mt-5">
        Estado del mercado
      </h2>
      <markets-table />
    </div>
  </v-navigation-drawer>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  useStore,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { useCategories } from '~/composables'
import SubscribeNewsLetter from '~/components/newsletter/SubscribeNewsLetter.vue'
import MarketsTable from '~/components/stock/markets/MarketsTable.vue'

export default defineComponent({
  name: 'FinancialNavigatorDrawer',
  components: { MarketsTable, SubscribeNewsLetter },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const drawer = ref(false)

    const categoriesComposables = useCategories()
    const store = useStore()

    const categoriesMenu = computed(
      () => categoriesComposables.categoriesMenu.value
    )

    const getCategoriesMenu = async () => {
      await categoriesComposables.getCategoriesMenu()
    }

    watch(
      () => props.active,
      (value) => {
        drawer.value = value
      }
    )

    watch(
      () => drawer.value,
      (value) => {
        store.commit('drawer/setFinancialDrawerActive', value)
      }
    )

    onMounted(() => {
      getCategoriesMenu()
    })

    return {
      drawer,
      categoriesMenu,
    }
  },
})
</script>

<style></style>
