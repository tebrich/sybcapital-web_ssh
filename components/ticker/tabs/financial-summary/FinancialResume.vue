<template>
  <div v-if="financialResume">
    <div class="sb-px-4 sb-bg-gray-100 sb-pt-3 sb-pb-4 sb-rounded">
      <div class="sb-flex sb-items-center sb-gap-5">
        <h3 class="sb-font-bold">
          Rating:
        </h3>
        <v-rating :value="financialResume.ratingScore" color="primary" readonly />
      </div>
      <div class="sb-flex sb-items-center sb-gap-5">
        <h3 class="sb-font-bold">
          Recomendación:
        </h3>
        <h3 class="sb-font-bold" :class="[financialResume.ratingRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']">
          {{ financialResume.ratingRecommendation }}
        </h3>
      </div>
    </div>
    <div class="sb-flex sb-mt-10">
      <div class="sb-w-6/12 sb-border-r-2 sb-border-gray-200">
        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Símbolo
          </p>
          <p class="sb-font-bold">
            {{ financialResume.symbol }}
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Precio
          </p>
          <p class="sb-font-bold">
            ${{ financialResume.price }}
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Beta
          </p>
          <p class="sb-font-bold">
            {{ (financialResume.beta).toFixed(3) }}
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Cap. Mercado
          </p>
          <p class="sb-font-bold">
            {{ (financialResume.mktCap / 1000000000).toFixed(3) }}B
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Rango 52 Semanas
          </p>
          <p class="sb-font-bold">
            {{ financialResume.range }}
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Sector
          </p>
          <p class="sb-font-bold">
            {{ financialResume.sector }}
          </p>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            PO Alcista
          </p>
          <p class="sb-font-bold">
            {{ financialResume.targetHigh.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="sb-w-6/12">
        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            PO Bajista
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.targetLow }}
            </p>
            <div class="sb-w-20 sb-text-center" />
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            PO W.Street
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.targetConsensus }}
            </p>
            <div class="sb-w-20 sb-text-center" />
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            ROE
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.roe.toFixed(2) }}
            </p>
            <p :class="[financialResume.roeRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']" class="sb-font-bold sb-w-20 sb-text-center">
              {{ financialResume.roeRecommendation }}
            </p>
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            ROA
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.roa.toFixed(2) }}
            </p>
            <p :class="[financialResume.roaRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']" class="sb-font-bold sb-w-20 sb-text-center">
              {{ financialResume.roaRecommendation }}
            </p>
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            Deuda / Patrimonio
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.debtEquity.toFixed(2) }}
            </p>
            <p :class="[financialResume.debtEquityRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']" class="sb-font-bold sb-w-20 sb-text-center">
              {{ financialResume.debtEquityRecommendation }}
            </p>
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            P/E
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold">
              {{ financialResume.pe.toFixed(2) }}
            </p>
            <p :class="[financialResume.peRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']" class="sb-font-bold sb-w-20 sb-text-center">
              {{ financialResume.peRecommendation }}
            </p>
          </div>
        </div>

        <div class="sb-flex sb-justify-between sb-items-center sb-border-b-[1px] sb-border-gray-200 sb-px-4 sb-py-2">
          <p class="sb-font-light">
            P/B
          </p>
          <div class="sb-flex sb-items-center sb-gap-2">
            <p class="sb-font-bold ">
              {{ financialResume.pb.toFixed(2) }}
            </p>
            <p :class="[financialResume.pbRecommendation.search('Buy') > -1 ? 'sb-text-green-500' : 'sb-text-red-500']" class="sb-font-bold sb-w-20 sb-text-center">
              {{ financialResume.pbRecommendation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import { useFinancialSummary } from '~/composables'

export default defineComponent({
  name: 'FinancialResume',

  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  setup(props: any) {
    const useFinancialSummaryComposable = useFinancialSummary()

    const getFinancialResume = async () => {
      await useFinancialSummaryComposable.getFinancialResume(props.symbol)
    }

    const financialResume = computed(() => useFinancialSummaryComposable.financialResume.value)

    onMounted(() => {
      getFinancialResume()
    })

    return {
      financialResume
    }
  }
})
</script>

<style scoped>
p {
  font-size: 14px !important;
  margin: 0 !important;
}
</style>
