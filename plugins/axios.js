// plugins/axios.js
export default function ({ $axios, $config }) {
  if (process.client) {
    // 1) Intentamos leer el token que Nuxt Auth Next guarda automáticamente
    let token = localStorage.getItem('auth._token.local')

    // 2) Si no existe, caemos a tu clave “accessToken” (si la usas manualmente)
    if (!token) {
      token = localStorage.getItem('accessToken')
    }

    // 3) Si encontramos token, lo limpiamos de cualquier “Bearer ” duplicado y lo inyectamos
    if (token) {
      // Si la cadena ya contiene “Bearer <token>”, le quitamos el prefijo para no duplicarlo
      const pure = token.replace(/^(Bearer\s+)/i, '')
      $axios.setToken(pure, 'Bearer')
    }
  }
}

