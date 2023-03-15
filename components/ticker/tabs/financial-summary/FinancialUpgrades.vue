<template>
  <div v-if="!loading" class="sb-my-10">
    <client-only>
      <h3 class="sb-text-lg sb-font-bold sb-mb-4">
        Upgrades & Downgrades
      </h3>
      <div v-for="(item, index) in financialUpgrades" :key="index">
        <div class="sb-py-2 sb-flex sb-items-center sb-justify-between">
          <div>
            <h4 class="sb-font-bold">
              {{ item.gradingCompany }}
            </h4>
            <p class="!sb-mb-0">
              Previous: <strong class="sb-text-primary">{{ item.previousGrade }}</strong>
            </p>
          </div>
          <div>
            <p class="sb-font-light !sb-mb-0 sb-text-sm sb-text-right">
              {{ item.publishedDate | formatDate }}
            </p>
            <p class="!sb-mb-0">
              New: <strong class="sb-text-primary">{{ item.newGrade }}</strong>
            </p>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { useFinancialSummary } from '~/composables'

export default defineComponent({
  name: 'FinancialUpgrades',

  filters: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  },

  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const useFinancialSummaryComposable = useFinancialSummary()

    const loading = ref(false)

    const getFinancialUpgrades = async () => {
      loading.value = true
      await useFinancialSummaryComposable.getFinancialUpgrades(props.symbol)
      loading.value = false
    }

    const financialUpgrades = computed(() => useFinancialSummaryComposable.financialUpgrades.value.splice(0, 4))

    onMounted(() => {
      getFinancialUpgrades()
    })

    return {
      loading,
      financialUpgrades
    }
  }
})
</script>
