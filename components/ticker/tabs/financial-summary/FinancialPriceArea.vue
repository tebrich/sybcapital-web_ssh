<template>
  <div class="sb-h-full sb-flex sb-items-center sb-justify-center">
    <client-only v-if="!loading">
      <div class="sb-w-full sb-h-full">
        <div class="sb-flex sb-items-center sb-justify-start sb-mb-6">
          <v-btn text x-small :color="mode === 'daily' ? 'primary' : null" @click="mode = 'daily'">
            Hoy
          </v-btn>
          <v-btn text x-small :color="mode === 'weekly' ? 'primary' : null" @click="mode = 'weekly'">
            Semanal
          </v-btn>
          <v-btn text x-small :color="mode === 'quarterly' ? 'primary' : null" @click="mode = 'quarterly'">
            Semestral
          </v-btn>
          <v-btn text x-small :color="mode === 'yearly' ? 'primary' : null" @click="mode = 'yearly'">
            Anual
          </v-btn>
          <v-btn text x-small :color="mode === 'all' ? 'primary' : null" @click="mode = 'all'">
            Todo
          </v-btn>
        </div>
        <ApexCharts
          :options="{
            chart: {
              id: 'area-datetime',
              type: 'area',
              zoom: {
                autoScaleYaxis: true
              },
            /*  toolbar: {
              show: false
            } */
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            xaxis: {
              type: 'datetime',
              min: minDate,
              tickAmount: 6,
            },
            tooltip: {
              x: {
                format: formatedDate
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
              }
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(1)
                }
              }
            }
          }"
          :series="[{
            data: values
          }]"
          chart-id="areaChart"
        />
      </div>
    </client-only>
    <v-btn
      v-else
      color="primary"
      plain
      loading
      disabled
      x-large
      block
    ></v-btn>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { useFinancialSummary } from '~/composables'

export default {
  name: 'FinancialPriceArea',

  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const useFinancialSummaryComposable = useFinancialSummary()

    const mode = ref('daily')
    const loading = ref(false)
    const minDate = ref()
    const values = ref([])
    const formatedDate = computed(() => mode.value === 'daily' ? 'dd MMM yyyy hh:mm:ss' : 'dd MMM yyyy')

    const getFinancialPriceArea = async () => {
      loading.value = true
      const type = mode.value === 'daily' ? 'daily' : 'all'
      const data = await useFinancialSummaryComposable.getFinancialPriceArea(props.symbol, type)

      if (mode.value === 'weekly') {
        minDate.value = dayjs(data[0].date).subtract(1, 'week').toDate().getTime()
      } else if (mode.value === 'quarterly') {
        minDate.value = dayjs(data[0].date).subtract(6, 'months').toDate().getTime()
      } else if (mode.value === 'yearly') {
        minDate.value = dayjs(data[0].date).subtract(1, 'year').toDate().getTime()
      } else {
        minDate.value = new Date(data[data.length - 1].date).getTime()
      }

      values.value = data.map((item) => {
        return [new Date(item.date).getTime(), item.close]
      })

      loading.value = false
    }

    watch(mode, () => {
      getFinancialPriceArea()
    })

    onMounted(() => {
      getFinancialPriceArea()
    })

    return {
      mode,
      loading,
      minDate,
      values,
      formatedDate
    }
  }
}
</script>
