export default {
  server: {
    port: process.env.NUXT_ENV_PORT || 8082,
    host: process.env.HOST || '0.0.0.0'
  },

  ssr: true,

  target: 'server',

  head: {
    titleTemplate:
      '%s - SyB Capital Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera',
    title: 'SyB Capital',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'description',
        content:
          'Sybcapital.com, es una plataforma global de mercados financieros que se esfuerza por educar, informar, involucrar y capacitar a las personas para que tomen el control de sus vidas financieras actuales y futuras, ¡para que puedan beneficiarse dentro de los diferentes mercados mundiales! Ofrecemos acceso a cotizaciones de acciones gratuitas, gráficos de  acciones, noticias bursátiles de última hora, historias principales del mercado, calificaciones gratuitas de acciones, presentaciones ante la SEC, IPO, historial de precios de acciones, futuros, ETFs, Commodities, eventos corporativos, finanzas de empresas públicas y mucho más. Strategy & Business Capital Market (sybcapital.com), es un verdadero disruptor, mejorando enormemente la forma en que las personas consumen los datos del mercado financiero.'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'SyB Capital Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Sybcapital.com, es una plataforma global de mercados financieros que se esfuerza por educar, informar, involucrar y capacitar a las personas para que tomen el control de sus vidas financieras actuales y futuras, ¡para que puedan beneficiarse dentro de los diferentes mercados mundiales! Ofrecemos acceso a cotizaciones de acciones gratuitas, gráficos de  acciones, noticias bursátiles de última hora, historias principales del mercado, calificaciones gratuitas de acciones, presentaciones ante la SEC, IPO, historial de precios de acciones, futuros, ETFs, Commodities, eventos corporativos, finanzas de empresas públicas y mucho más. Strategy & Business Capital Market (sybcapital.com), es un verdadero disruptor, mejorando enormemente la forma en que las personas consumen los datos del mercado financiero.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://sybcapital-website.s3.sa-east-1.amazonaws.com/logo-color'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content:
          'SyB Capital Noticias de Mercado, Cotizaciones, Gráficos e Información Financiera'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          'Sybcapital.com, es una plataforma global de mercados financieros que se esfuerza por educar, informar, involucrar y capacitar a las personas para que tomen el control de sus vidas financieras actuales y futuras, ¡para que puedan beneficiarse dentro de los diferentes mercados mundiales! Ofrecemos acceso a cotizaciones de acciones gratuitas, gráficos de  acciones, noticias bursátiles de última hora, historias principales del mercado, calificaciones gratuitas de acciones, presentaciones ante la SEC, IPO, historial de precios de acciones, futuros, ETFs, Commodities, eventos corporativos, finanzas de empresas públicas y mucho más. Strategy & Business Capital Market (sybcapital.com), es un verdadero disruptor, mejorando enormemente la forma en que las personas consumen los datos del mercado financiero.'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content:
          'https://sybcapital-website.s3.sa-east-1.amazonaws.com/logo-color'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['~/assets/css/main.css'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxt/postcss8'
  ],

  plugins: [
    '@/plugins/axios',
    '@/plugins/validate',
    '@/plugins/vueMathjax',
    { src: '@/plugins/tiptapVuetify', mode: 'client' },
    { src: '~/plugins/apex-chart.js', mode: 'client' }
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: false,
        language: 'es',
        mode: 'enterprise', // Mode: 'base', 'enterprise'
        siteKey: '6LdkeCskAAAAAOaBkg_4-MM07e7U5s_KPG3K7GdQ', // Site key for requests
        version: 'v3', // Version
        size: 'normal'
      }
    ]
  ],

  axios: {
    baseURL: process.env.API_BASE_URL || 'https://sybcapital-api.worksheep.net'
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          global: true,
          type: 'Bearer'
        },
        user: {
          property: 'data'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/users/me', method: 'get' }
        },
        redirect: {
          login: '/admin-panel',
          home: '/'
        },
        watchLoggedIn: true,
        rewriteRedirects: false,
        resetOnError: true
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: {
        // vuetify shortcut colors
        primary: '#3E4095',
        secondary: '#ED3237'
      }
    }
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    transpile: ['vuetify/lib', 'tiptap-vuetify', 'vee-validate/dist/rules', 'vee-validate/dist/locale']
  },

  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.sybcapital.com'
  }
}
