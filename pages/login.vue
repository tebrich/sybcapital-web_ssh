<template>
  <div
    class="sb-flex sb-flex-col sb-items-center sb-justify-center sb-h-full sb-w-full"
  >
    <v-img
      width="150"
      height="150"
      contain
      :src="require('@/assets/img/png/logo.png')"
      alt="SyB Capital Logo"
      class="sb-mb-2 sb-cursor-pointer"
    />
    <h2 class="sb-text-3xl sb-font-normal sb-mb-10">Iniciar sesión</h2>
    <v-form class="sb-w-full" @submit.prevent="userLogin">
      <v-text-field type="text" label="Correo" outlined v-model="login.email" />
      <v-text-field
        type="password"
        label="Contraseña"
        outlined
        v-model="login.password"
      />
      <v-btn type="submit" large class="sb-mx-auto" color="secondary" block>
        Acceder
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Login',

  layout: 'empty',

  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },

  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', { data: this.login })
        await this.$router.replace('/admin-panel')
      } catch (err) {
        console.log(err)
      }
    },
  },

  head: {
    title: 'Login',
  },
})
</script>

<style></style>
