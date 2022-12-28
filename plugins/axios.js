import { setAxios } from '@/utils'

export default function ({ $axios, redirect, store, app, route }) {
  $axios.setBaseURL(process.env.apiBaseUrl)

  setAxios($axios)
}
