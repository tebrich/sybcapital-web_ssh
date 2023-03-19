<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Marcos Tebrich
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            <p class="sb-text-sm sb-font-extralight">
              Administrador
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item link nuxt to="/admin-panel">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-group prepend-icon="mdi-post-outline" no-action>
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>Blog</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link nuxt to="/admin-panel/blog/posts">
              <v-list-item-content>
                <v-list-item-title>Publicaciones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link nuxt to="/admin-panel/blog/categories">
              <v-list-item-content>
                <v-list-item-title>Categorias</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link nuxt to="/admin-panel/blog/tags">
              <v-list-item-content>
                <v-list-item-title>Tags</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item link nuxt to="/admin-panel/newsletter">
            <v-list-item-icon>
              <v-icon>mdi-bullhorn-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Suscriptores</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item link nuxt to="/admin-panel/users">
            <v-list-item-icon>
              <v-icon>mdi-account-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>-->
        </v-list-item-group>
      </v-list>

      <v-spacer />

      <v-btn class="sb-mx-2 !sb-rounded-lg sb-mt-60" outlined @click="logout">
        <v-icon>mdi-logout</v-icon>
        <span>Cerrar Sesion</span>
      </v-btn>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Admin',

  data() {
    return {
      drawer: true,
      group: null
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      window.location.reload()
    }
  }
})
</script>

<style></style>
