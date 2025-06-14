<template>
  <div class="sb-flex sb-flex-col sb-items-center sb-justify-center sb-h-full sb-w-full">
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
      <v-text-field
        v-model="login.email"
        type="text"
        label="Correo"
        outlined
        required
      />
      <v-text-field
        v-model="login.password"
        type="password"
        label="Contraseña"
        outlined
        required
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
  

  // 1) Anula el middleware global de auth
  middleware: [],
  auth: false,

  layout: 'empty',


  data() {
    return {
      // Cambiamos "username" por "email" para coincidir con el DTO del backend
      login: {
        email: '',
        password: ''
      },
    }
  },

  methods: {
    async userLogin() {
      this.errorMsg = ''
      try {
        // 1) Le decimos a Nuxt Auth: haz login, PERO NO me redirijas automáticamente.
        await this.$auth.loginWith('local', {
          data:     this.login,
          redirect: false
        })
        // 2) Si todo salió bien, forzamos navegar a /admin-panel
        this.$router.replace('/admin-panel')
      } catch (err) {
        // Error 401 → credenciales inválidas
        if (err.response && err.response.status === 401) {
          this.errorMsg = 'Credenciales inválidas'
        }
        // Si la API mandó mensaje diferente
        else if (err.response && err.response.data && err.response.data.message) {
          this.errorMsg = err.response.data.message
        }
        // Cualquier otro error
        else {
          this.errorMsg = 'Ocurrió un error inesperado'
        }
      }
    }
  },
  head() {
    return { title: 'Login' }
  }
})
</script>

