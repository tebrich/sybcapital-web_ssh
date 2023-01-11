import { ref, computed, useContext } from '@nuxtjs/composition-api'
import {
  StockMarketsModel,
  StockMarketsMoversModel,
} from '~/models/stock-prices.model'

export const useStockPrices = () => {
  const stockMarkets = ref<StockMarketsModel>()
  const NASDAQ = ref<StockMarketsMoversModel[]>([])
  const NYSE = ref<StockMarketsMoversModel[]>([])
  const OTC = ref<StockMarketsMoversModel[]>([])

  const { $axios } = useContext()

  const getMartkets = async () => {
    const { data } = await $axios.get('/stock-prices/markets')
    stockMarkets.value = data
  }

  const getNASDAQ = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NASDAQ',
        limit: 10,
      },
    })
    NASDAQ.value = data
  }

  const getNYSE = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NYSE',
        limit: 10,
      },
    })
    NYSE.value = data
  }

  const getOTC = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'OTC',
        limit: 10,
      },
    })
    OTC.value = data
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
  }
}
