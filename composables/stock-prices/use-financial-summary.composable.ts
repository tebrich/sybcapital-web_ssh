import { ref, useContext } from '@nuxtjs/composition-api'
import { FinancialBars, FinancialBubbles, FinancialResume, FinancialUpgrades } from '~/models/stock-prices.model'

export const useFinancialSummary = () => {
  const { $axios } = useContext()
  const financialResume = ref<FinancialResume>()
  const financialBars = ref<FinancialBars>()
  const financialBubbles = ref<FinancialBubbles[]>([])
  const financialUpgrades = ref<FinancialUpgrades[]>([])

  const getFinancialResume = async (symbol: string) => {
    const data = await $axios.$get<FinancialResume>(`/stock-prices/financial-resume/${symbol}`)
    financialResume.value = data
    return data
  }

  const getFinancialBars = async (symbol: string) => {
    const data = await $axios.$get<FinancialBars>(`/stock-prices/financial-bars/${symbol}`)
    financialBars.value = data
    return data
  }

  const getFinancialBubbles = async (symbol: string) => {
    const data = await $axios.$get<FinancialBubbles[]>(`/stock-prices/financial-bubbles/${symbol}`)
    financialBubbles.value = data
    return data
  }

  const getFinancialUpgrades = async (symbol: string) => {
    const data = await $axios.$get<FinancialUpgrades[]>(`/stock-prices/financial-upgrades/${symbol}`)
    financialUpgrades.value = data
    return data
  }

  return {
    financialResume,
    getFinancialResume,
    financialBars,
    getFinancialBars,
    financialBubbles,
    getFinancialBubbles,
    financialUpgrades,
    getFinancialUpgrades
  }
}
