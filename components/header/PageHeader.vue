<template>
  <div class="sb-border-b-2 sb-border-gray-500 sb-border-opacity-10 sb-shadow-md sb-bg-white sb-fixed sb-top-0 sb-left-0 sb-w-full sb-z-10">
    <v-container>
      <header class="sb-flex sb-justify-between sb-items-center sb-gap-3">
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
        <div class="sb-h-[90px] sb-bg-black sb-border-r-[2px] sb-border-r-gray-500 sb-opacity-10" />
        <div>
          <ul class="sb-flex sb-flex-wrap sb-items-center sb-justify-center sb-gap-2 !sb-p-0 !sb-m-0">
            <li>
              <v-btn nuxt text to="/" small>
                Inicio
              </v-btn>
            </li>
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  Inversiones
                  <v-icon color="primary">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item nuxt to="#">
                  <v-list-item-title>5G</v-list-item-title>
                </v-list-item>
                <v-list-item nuxt to="#">
                  <v-list-item-title>Metaverso</v-list-item-title>
                </v-list-item>
                <v-list-item nuxt to="#">
                  <v-list-item-title>EV</v-list-item-title>
                </v-list-item>
                <v-list-item nuxt to="#">
                  <v-list-item-title> Clean energy</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <li>
              <v-btn small nuxt text to="">
                Stock
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                ETFs
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                Bonos
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                Options
              </v-btn>
            </li>
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  Divisas
                  <v-icon color="primary">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item nuxt to="#">
                  <v-list-item-title>Majors</v-list-item-title>
                </v-list-item>
                <v-list-item nuxt to="#">
                  <v-list-item-title>Exóticas</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <li>
              <v-btn small nuxt text to="">
                Cri nuxt textptomonedas
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                Portafolio
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                ICM CAPITAL LTD
              </v-btn>
            </li>
            <li>
              <v-btn small nuxt text to="">
                Contacto
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="sb-h-[90px] sb-bg-black sb-border-r-[2px] sb-border-r-gray-500 sb-opacity-10" />
        <div>
          <v-btn icon>
            <v-icon color="primary">
              mdi-magnify
            </v-icon>
          </v-btn>
        </div>
      </header>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped>

</style>
