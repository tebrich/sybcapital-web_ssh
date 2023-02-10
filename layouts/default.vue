<template>
  <v-app>
    <page-header />
    <header-menu-navigation-drawer :active="menuNavigatorDrawer" />
    <div class="sb-h-32"></div>
    <v-main>
      <v-container>
        <div class="sb-py-5">
          <nuxt />
        </div>
      </v-container>
    </v-main>

    <financial-navigator-drawer :active="financialNavigatorDrawer" />

    <page-footer />
  </v-app>
</template>

<script>
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import PageHeader from '~/components/header/PageHeader.vue'
import PageFooter from '~/components/footer/PageFooter.vue'
import FinancialNavigatorDrawer from '~/components/header/FinancialNavigatorDrawer.vue'

export default defineComponent({
  name: 'Default',

  components: {
    FinancialNavigatorDrawer,
    PageHeader,
    PageFooter,
  },

  setup() {
    const store = useStore()

    const menuNavigatorDrawer = computed(
      () => store.state.drawer.menuDrawerActive
    )

    const financialNavigatorDrawer = computed(
      () => store.state.drawer.financialDrawerActive
    )

    return {
      menuNavigatorDrawer,
      financialNavigatorDrawer,
    }
  },
})
</script>
