<template>
  <div
    class="sb-border-b-2 sb-border-gray-500 sb-border-opacity-10 sb-shadow-md sb-bg-white sb-fixed sb-top-0 sb-left-0 sb-w-full sb-z-50 sb-h-32"
  >
    <v-container class="sb-h-full">
      <header
        v-if="!showSearch"
        class="sb-flex sb-justify-between sb-items-center sb-gap-3"
      >
        <div>
          <v-img
            width="100"
            height="100"
            contain
            :src="require('@/assets/img/png/logo.png')"
            alt="SyB Capital Logo"
            class="sb-mr-2 sb-cursor-pointer"
            @click="$router.push('/')"
          />
        </div>
        <div
          class="sb-h-[90px] sb-bg-black sb-border-r-[2px] sb-border-r-gray-500 sb-opacity-10"
        />
        <div>
          <ul
            class="sb-flex sb-flex-wrap sb-items-center sb-justify-center sb-gap-2 !sb-p-0 !sb-m-0"
          >
            <li>
              <v-btn nuxt text to="/" small> Inicio </v-btn>
            </li>

            <v-menu
              v-for="(item, pindex) in categoriesMenu"
              :key="pindex"
              open-on-hover
              bottom
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn small text v-bind="attrs" v-on="on">
                  {{ item.name }}
                  <v-icon color="primary"> mdi-chevron-down </v-icon>
                </v-btn>
              </template>

              <v-list v-for="(child, cindex) in item.children" :key="cindex">
                <v-list-item nuxt to="#">
                  <v-list-item-title>{{ child.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <li>
              <v-btn small nuxt text to=""> Contacto </v-btn>
            </li>
          </ul>
        </div>
        <div
          class="sb-h-[90px] sb-bg-black sb-border-r-[2px] sb-border-r-gray-500 sb-opacity-10"
        />
        <div>
          <v-btn icon @click="showSearch = true">
            <v-icon color="primary"> mdi-magnify </v-icon>
          </v-btn>
        </div>
      </header>
      <search-menu v-else @close="showSearch = false" />
    </v-container>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { useCategories } from '~/composables'
import SearchMenu from '~/components/header/SearchMenu.vue'
export default defineComponent({
  name: 'PageHeader',
  components: { SearchMenu },

  setup() {
    const showSearch = ref(false)

    const categoriesComposables = useCategories()

    const categoriesMenu = computed(
      () => categoriesComposables.categoriesMenu.value
    )

    const getCategoriesMenu = async () => {
      await categoriesComposables.getCategoriesMenu()
    }

    onMounted(() => {
      getCategoriesMenu()
    })

    return {
      categoriesMenu,
      showSearch,
    }
  },
})
</script>

<style scoped></style>
