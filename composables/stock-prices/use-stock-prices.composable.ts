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
  const NASDAQ       = ref<StockMarketsMoversModel[]>([])
  const NYSE         = ref<StockMarketsMoversModel[]>([])
  const OTC          = ref<StockMarketsMoversModel[]>([])
  const FOREX        = ref<StockPricesModel[]>([])    // siempre un array, aunque no lo usemos
  const financialRatios = ref<StockFinancialRatios>()
  const companyData     = ref<StockPricesModel>()

  const { $axios } = useContext()

  // ──────────────────────────────────────────────────────────────────────────────
  // Trae sólo mercados generales (sin Forex)
  const getMartkets = async () => {
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

  // ──────────────────────────────────────────────────────────────────────────────
  // Forex: DESHABILITADO. No hace ninguna petición, siempre queda array vacío.
  const getForex = async () => {
    // Antes aquí hacíamos: await $axios.$get('/stock-prices/forex')
    // Lo comentamos por completo para evitar el 400 Bad Request:
    // try {
    //   FOREX.value = await $axios.$get<StockPricesModel[]>('/stock-prices/forex')
    // } catch (e) {
    //   console.warn('⚠️ Forex API deshabilitado:', e)
    //   FOREX.value = []
    // }
    FOREX.value = []
  }

  // ──────────────────────────────────────────────────────────────────────────────
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
    // ahora tu UI sólo llama a getMartkets (y a los movers). 
    // getForex queda disponible pero no hace peticiones.
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
    getFinancialStatementSymbolLists,
    getFinancialAnalytics
  }
}

