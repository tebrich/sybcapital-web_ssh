import { ref, useContext } from '@nuxtjs/composition-api'
import {
  StockFinancialRatios,
  StockMarketsModel,
  StockMarketsMoversModel,
  StockPricesModel
} from '~/models/stock-prices.model'

export const useStockPrices = () => {
  const stockMarkets = ref<StockMarketsModel>()
  const NASDAQ = ref<StockMarketsMoversModel[]>([])
  const NYSE = ref<StockMarketsMoversModel[]>([])
  const OTC = ref<StockMarketsMoversModel[]>([])
  const FOREX = ref<StockPricesModel[]>([])
  const financialRatios = ref<StockFinancialRatios>()
  const companyData = ref<StockPricesModel>()

  const { $axios } = useContext()

  const getMartkets = async () => {
    const { data } = await $axios.get('/stock-prices/markets')
    stockMarkets.value = data
  }

  const getNASDAQ = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NASDAQ',
        limit: 100
      }
    })
    NASDAQ.value = data
  }

  const getNYSE = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'NYSE',
        limit: 100
      }
    })
    NYSE.value = data
  }

  const getOTC = async () => {
    const { data } = await $axios.get('/stock-prices/movers', {
      params: {
        exchange: 'OTC',
        limit: 100
      }
    })
    OTC.value = data
  }

  const getForex = async () => {
    const { data } = await $axios.get('/stock-prices/forex')
    FOREX.value = data
  }

  const getFinancialRatios = async (symbol: string) => {
    const { data } = await $axios.get(`/stock-prices/financial-ratios/${symbol}`)
    financialRatios.value = data
    return data
  }

  const getCompanyData = async (symbol: string) => {
    const { data } = await $axios.get(`/stock-prices/stock/${symbol}`)
    companyData.value = data
    return data
  }

  const getFinancialStatementSymbolLists = async () => {
    const { data } = await $axios.get('/stock-prices/financial-symbol-lists')
    return data
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
    getFinancialRatios,
    financialRatios,
    getCompanyData,
    companyData,
    getFinancialStatementSymbolLists
  }
}
