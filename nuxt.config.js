export default {
  server: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
  },

  ssr: false,

  head: {
    titleTemplate:
      '%s - SyB Capital Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera',
    title: 'SyB Capital',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['~/assets/css/main.css'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxt/postcss8',
  ],

  plugins: ['@/plugins/axios'],

  modules: ['@nuxtjs/axios'],

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: {
        // vuetify shortcut colors
        primary: '#3E4095',
        secondary: '#ED3237',
      },
    },
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  env: {
    apiBaseUrl: 'http://localhost:3000',
  },
}
