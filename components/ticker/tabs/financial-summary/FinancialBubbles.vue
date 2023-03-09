<template>
  <div v-if="!loading" class="sb-my-10">
    <client-only>
      <div class="sb-flex sb-items-center sb-justify-between sb-mb-6">
        <h3 class="sb-text-lg sb-font-bold">
          Ingresos Actualizados
        </h3>
        <div class="sb-flex sb-items-center sb-gap-1">
          <div class="sb-w-4 sb-h-4 sb-border-2 sb-border-blue-700 sb-rounded-full"></div>
          <p class="!sb-m-0 sb-font-light">
            Consenso
          </p>
        </div>
      </div>
      <ApexCharts
        :options="{
          chart: {
            id: 'financial-bubbles',
            type: 'bubble'
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: categories,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          fill: {
            opacity: 0.8
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toFixed(1)
              }
            }
          }
        }"
        :series="[
          {
            name: 'Actuales',
            data: current
          },
          {
            name: 'Estimados',
            data: estimated,
            color: '#e1e1e1',
          }
        ]"
        chart-id="bubblesChart"
      />
    </client-only>
  </div>
</template>

<script>
import { onMounted, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useFinancialSummary } from '~/composables'

export default {
  name: 'FinancialBubbles',

  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const useFinancialSummaryComposable = useFinancialSummary()

    const loading = ref(false)
    const categories = ref([])
    const current = ref([])
    const estimated = ref([])

    const getFinancialBars = async () => {
      loading.value = true
      const data = await useFinancialSummaryComposable.getFinancialBubbles(props.symbol)

      categories.value = data.map((item) => {
        dayjs.extend(quarterOfYear)
        const date = dayjs(item.date)
        return `${date.year()} Q${date.quarter()}`
      })

      current.value = data.map((item, index) => {
        return [index + 1, item.actualEarningResult, 20]
      })

      estimated.value = data.map((item, index) => {
        return [index + 1, item.estimatedEarning, 20]
      })

      loading.value = false
    }

    onMounted(() => {
      getFinancialBars()
    })

    return {
      loading,
      categories,
      current,
      estimated
    }
  }
}
</script>
