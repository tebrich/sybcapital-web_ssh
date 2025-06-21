import { ref, useContext } from '@nuxtjs/composition-api'
import {
  FinancialAnalytics,
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

  // Funciones por mercado
  const getMarketIndexes = async () => {
    const { data } = await $axios.get<StockMarketsModel>('/stock-prices/markets')
    stockMarkets.value = data
  }

  const getNASDAQ = async () => {
    const { data } = await $axios.get<StockMarketsMoversModel[]>('/stock-prices/movers', {
      params: { exchange: 'NASDAQ', limit: 100 }
    })
    NASDAQ.value = data
  }

  const getNYSE = async () => {
    const { data } = await $axios.get<StockMarketsMoversModel[]>('/stock-prices/movers', {
      params: { exchange: 'NYSE', limit: 100 }
    })
    NYSE.value = data
  }

  const getOTC = async () => {
    const { data } = await $axios.get<StockMarketsMoversModel[]>('/stock-prices/movers', {
      params: { exchange: 'OTC', limit: 100 }
    })
    OTC.value = data
  }

  const getForex = async () => {
    FOREX.value = []
  }

  // Carga todo de una vez
  const getMarkets = async () => {
    await getMarketIndexes()
    await getNASDAQ()
    await getNYSE()
    await getForex()
  }

  const getFinancialRatios = async (symbol: string) => {
    const { data } = await $axios.get<StockFinancialRatios>(`/stock-prices/financial-ratios/${symbol}`)
    financialRatios.value = data
    return data
  }

  const getCompanyData = async (symbol: string) => {
    const { data } = await $axios.get<StockPricesModel>(`/stock-prices/stock/${symbol}`)
    companyData.value = data
    return data
  }

  const getFinancialStatementSymbolLists = async () => {
    const { data } = await $axios.get<string[]>('/stock-prices/financial-symbol-lists')
    return data
  }

  const getFinancialAnalytics = async (symbol: string): Promise<FinancialAnalytics> => {
    const { data } = await $axios.get<FinancialAnalytics>(`/stock-prices/financial-analytics/${symbol}`)
    return data
  }

  return {
    stockMarkets,
    NASDAQ,
    NYSE,
    OTC,
    FOREX,
    getMarkets,
    getMarketIndexes,
    getNASDAQ,
    getNYSE,
    getOTC,
    getForex,
    getFinancialRatios,
    financialRatios,
    getCompanyData,
    companyData,
    getFinancialStatementSymbolLists,
    getFinancialAnalytics
  }
}

