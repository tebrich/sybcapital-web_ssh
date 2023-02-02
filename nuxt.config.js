export default {
  server: {
    port: process.env.NUXT_ENV_PORT || 8082,
    host: process.env.HOST || '0.0.0.0',
  },

  ssr: true,

  target: 'static',

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

  plugins: [
    '@/plugins/axios',
    '@/plugins/validate',
    { src: '@/plugins/tiptapVuetify', mode: 'client' },
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: false,
        language: 'es',
        mode: 'enterprise', // Mode: 'base', 'enterprise'
        siteKey: '6LdkeCskAAAAAOaBkg_4-MM07e7U5s_KPG3K7GdQ', // Site key for requests
        version: 'v3', // Version
        size: 'normal',
      },
    ],
  ],

  axios: {
    baseURL: process.env.API_BASE_URL || 'https://sybcapital-api.worksheep.net',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/users/me', method: 'get' },
        },
        redirect: {
          login: '/admin-panel',
          home: '/',
        },
        watchLoggedIn: true,
        rewriteRedirects: false,
        resetOnError: true,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

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
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.sybcapital.com',
  },
}
