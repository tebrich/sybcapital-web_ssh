<template>
  <v-navigation-drawer v-model="drawer" app fixed temporary>
    <v-img
      width="150"
      height="150"
      contain
      :src="require('@/assets/img/png/logo.png')"
      alt="SyB Capital Logo"
      class="sb-cursor-pointer sb-block sb-mx-auto"
    />
    <v-list nav dense>
      <template v-for="(item, index) in categoriesMenu">
        <v-list-group v-if="item.children.length > 0" :key="index">
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="sb-text-2xl">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item nuxt link :to="`/category/${item.slug}`">
            <v-list-item-content>
              <v-list-item-title class="sb-ml-2">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="child in item.children"
            :key="child.name"
            nuxt
            link
            :to="`/category/${child.slug}`"
          >
            <v-list-item-content>
              <v-list-item-title class="sb-ml-2">
                {{ child.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else nuxt link :to="`/category/${item.slug}`">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item nuxt link to="/contact">
        <v-list-item-content>
          <v-list-item-title>Contacto</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { useCategories } from '~/composables'

export default defineComponent({
  name: 'MenuNavigationDrawer',
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

    onMounted(() => {
      getCategoriesMenu()
    })

    watch(
      () => props.active,
      (value) => {
        drawer.value = value
      }
    )

    watch(
      () => drawer.value,
      (value) => {
        store.commit('drawer/setMenuDrawerActive', value)
      }
    )

    return {
      drawer,
      categoriesMenu,
    }
  },
})
</script>

<style></style>
