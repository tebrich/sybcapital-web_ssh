import { ref, useContext } from '@nuxtjs/composition-api'
import { FinancialResume } from '~/models/stock-prices.model'

export const useFinancialSummary = () => {
  const { $axios } = useContext()
  const financialResume = ref<FinancialResume>()

  const getFinancialResume = async (symbol: string) => {
    const data = await $axios.$get<FinancialResume>(`/stock-prices/financial-resume/${symbol}`)
    financialResume.value = data
    return data
  }

  return {
    financialResume,
    getFinancialResume
  }
}
