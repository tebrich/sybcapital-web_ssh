/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  prefix: 'sb-',
  theme: {
    container: { center: true },
    extend: {
      colors: {
        primary: '#3E4095',
        secondary: '#ED3237',
        font: '#606060'
      }
    }
  },
  plugins: []
}
