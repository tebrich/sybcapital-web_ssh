import { setAxios } from '@/utils'

export default function ({ $axios, redirect, store, app, route }) {
  $axios.setBaseURL(process.env.apiBaseUrl)

  $axios.onRequest((config) => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem('token'))

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        $axios.setToken(token, 'Bearer')
      }
    } else {
      console.log('You are on the server')
    }
  })

  setAxios($axios)
}
