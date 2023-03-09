<template>
  <div v-if="!loading" class="sb-my-10">
    <client-only>
      <div class="sb-flex sb-items-center sb-justify-between">
        <h3 class="sb-text-lg sb-font-bold">
          Financiero
        </h3>
        <div class="sb-flex sb-items-center sb-gap-2">
          <div class="sb-flex sb-items-center sb-gap-1">
            <div class="sb-w-3 sb-h-3 sb-bg-blue-600"></div>
            <p class="!sb-m-0 sb-font-light">
              Revenue
            </p>
          </div>
          <div class="sb-flex sb-items-center sb-gap-1">
            <div class="sb-w-3 sb-h-3 sb-bg-green-600"></div>
            <p class="!sb-m-0 sb-font-light">
              Net Income
            </p>
          </div>
        </div>
      </div>
      <div>
        <v-btn text x-small :color="mode === 'annual' ? 'primary' : null" @click="mode = 'annual'">
          Anual
        </v-btn>
        <v-btn text x-small :color="mode !== 'annual' ? 'primary' : null" @click="mode = 'quarter'">
          Trimestral
        </v-btn>
      </div>
      <ApexCharts
        v-if="mode === 'annual'"
        :options="{
          chart: {
            id: 'financial-bars',
            type: 'bar'
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: annualCategories
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val < 999999999 ? val / 1000000 + 'M' : val / 1000000000 + 'B'
              }
            }
          },
          tooltip: {
            theme: 'light',
            fillSeriesColor: false,
            y: {
              formatter: function (val) {
                return val < 999999999 ? val / 1000000 + 'M' : val / 1000000000 + 'B'
              }
            }
          }
        }"
        :series="[
          {
            name: 'Revenue',
            data: annualRevenue,
            color: '#2564eb'
          },
          {
            name: 'Net Income',
            data: annualNetIncome,
            color: '#16a34a'
          }
        ]"
        chart-id="lineChart"
      />
      <ApexCharts
        v-else
        :options="{
          chart: {
            id: 'financial-bars',
            type: 'bar'
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: quarterCategories
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val < 999999999 ? val / 1000000 + 'M' : val / 1000000000 + 'B'
              }
            }
          },
          tooltip: {
            theme: 'light',
            fillSeriesColor: false,
            y: {
              formatter: function (val) {
                return val < 999999999 ? val / 1000000 + 'M' : val / 1000000000 + 'B'
              }
            }
          }
        }"
        :series="[
          {
            name: 'Revenue',
            data: quarterRevenue,
            color: '#2564eb'
          },
          {
            name: 'Net Income',
            data: quarterNetIncome,
            color: '#16a34a'
          }
        ]"
        chart-id="lineChart"
      />
    </client-only>
  </div>
</template>

<script>
import { computed, onMounted, defineComponent, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useFinancialSummary } from '~/composables'

export default defineComponent({
  name: 'FinancialBars',

  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const useFinancialSummaryComposable = useFinancialSummary()

    const loading = ref(false)
    const mode = ref('annual')
    const annualCategories = ref([])
    const quarterCategories = ref([])
    const annualRevenue = ref([])
    const annualNetIncome = ref([])
    const quarterRevenue = ref([])
    const quarterNetIncome = ref([])

    const getFinancialBars = async () => {
      loading.value = true
      const data = await useFinancialSummaryComposable.getFinancialBars(props.symbol)

      annualCategories.value = data.annual.map((item) => {
        return dayjs(item.date).format('YYYY')
      })

      quarterCategories.value = data.annual.map((item) => {
        dayjs.extend(quarterOfYear)
        const date = dayjs(item.date)
        return `${date.year()} Q${date.quarter()}`
      })

      annualRevenue.value = data.annual.map((item) => {
        return item.revenue
      })

      annualNetIncome.value = data.annual.map((item) => {
        return item.netIncome
      })

      quarterRevenue.value = data.quarterly.map((item) => {
        return item.revenue
      })

      quarterNetIncome.value = data.quarterly.map((item) => {
        return item.netIncome
      })

      loading.value = false
    }

    onMounted(() => {
      getFinancialBars()
    })

    return {
      loading,
      mode,
      annualCategories,
      annualRevenue,
      annualNetIncome,
      quarterCategories,
      quarterRevenue,
      quarterNetIncome
    }
  }
})
</script>
