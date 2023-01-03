import { setAxios } from '@/utils'

export default function ({ $axios, redirect, store, app, route }) {
  $axios.setBaseURL(process.env.apiBaseUrl)

  $axios.onRequest((config) => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      $axios.setToken(token, 'Bearer')
    }
  })

  setAxios($axios)
}
