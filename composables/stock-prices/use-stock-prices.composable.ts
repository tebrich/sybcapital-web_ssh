import { ref, useContext } from '@nuxtjs/composition-api'
import {
  StockMarketsModel,
  StockMarketsMoversModel,
  StockPricesModel,
} from '~/models/stock-prices.model'

export const useStockPrices = () => {
  const stockMarkets = ref<StockMarketsModel>()
  const NASDAQ = ref<StockMarketsMoversModel[]>([])
  const NYSE = ref<StockMarketsMoversModel[]>([])
  const OTC = ref<StockMarketsMoversModel[]>([])
  const FOREX = ref<StockPricesModel[]>([])

  const { $axios } = useContext()

  const getMartkets = async () => {
    const { data } = await $axios.get('/stock-prices/markets')
    stockMarkets.value = data
  }

  const getNASDAQ = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NASDAQ',
        limit: 100,
      },
    })
    NASDAQ.value = data
  }

  const getNYSE = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NYSE',
        limit: 100,
      },
    })
    NYSE.value = data
  }

  const getOTC = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'OTC',
        limit: 100,
      },
    })
    OTC.value = data
  }

  const getForex = async () => {
    const { data } = await $axios.get('/stock-prices/forex')
    FOREX.value = data
  }

  return {
    stockMarkets,
    NASDAQ,
    NYSE,
    OTC,
    getMartkets,
    getNASDAQ,
    getNYSE,
    getOTC,
    getForex,
    FOREX,
  }
}
