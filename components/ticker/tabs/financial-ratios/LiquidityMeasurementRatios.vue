<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Ratios de Medida de Liquidez
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Liquidez
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CurrentAssets \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.currentRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Ratio de liquidez de 1,0 o superior es una indicación de que la empresa está bien posicionada para cubrir sus pasivos corrientes o a corto plazo.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Solvencia Inmediata
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CashandCashEquivalents + ShortTermInvestments + AccountReceivables \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.quickRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de solvencia inmediata es más conservador que el índice de liquidez, ya que excluye el inventario y otros activos corrientes, que generalmente son más difíciles de convertir en efectivo. Un índice de solvencia inmediata más alto significa una mejor posición actual de liquidez
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Índice de Caja
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$CashandCashEquivalents \over CurrentLiabilities$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El índice de caja es una medida de liquidez que muestra la capacidad de una empresa para cubrir sus obligaciones a corto plazo utilizando únicamente efectivo y equivalentes de efectivo. La relación de caja se obtiene sumando las reservas totales de efectivo y valores cercanos al efectivo de una empresa y dividiendo esa suma por su pasivo corriente total.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Días de Ventas Pendientes
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(AccountReceivable(start) + AccountReceivable(end)) / 2 \over Revenue / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfSalesOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Días de ventas pendientes (DSO) es el número promedio de días que una empresa tarda en recibir el pago de una venta. Un alto número de DSO sugiere que una empresa está experimentando retrasos en la recepción de pagos, lo que puede resultar en un problema de flujo de efectivo. Un DSO bajo indica que la compañía está recibiendo sus pagos rápidamente.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Días de Inventario Pendiente
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(Inventories(start) + Inventories(end)) / 2 \over Revenue / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfInventoryOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Días de inventario pendiente (DIO) es una relación de gestión de capital de trabajo que mide el número promedio de días que una empresa tiene inventario para antes de convertirlo en ventas. Cuanto más baja sea la cifra, más corto será el período en que el efectivo esté inmovilizado en el inventario y menor será el riesgo de que las existencias se vuelvan obsoletas.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Ciclo de Funcionamiento
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DSO + DIO $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.operatingCycleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          (DSO + DIO) - Un Ciclo de Operación (OC) se refiere a los días requeridos para que una empresa reciba el inventario, venda el inventario y recoja efectivo de la venta del inventario. Este ciclo juega un papel importante en la determinación de la eficiencia de un negocio.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Días Pendientes de Cuentas por Pagar
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$(AccountsPayable(start) + AccountsPayable(end)) / 2 \over COGS / 356$$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.daysOfPayablesOutstandingTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Días pendientes de pago (DPO) es el promedio de días que una empresa tarda en pagar facturas por bienes y servicios obtenidos a crédito. El DPO es una métrica financiera clave para el seguimiento y la gestión del flujo de caja. Un DPO alto es generalmente favorable porque significa que hay más efectivo disponible para financiar operaciones
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Ciclo de Conversión de Efectivo (CCC)
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DSO + DIO - DPO $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.cashConversionCycleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          El ciclo de conversión de efectivo (CCC=DSO + DIO - DPO), es una métrica que expresa el tiempo (en días) que tarda una empresa en convertir sus inversiones en inventario y otros recursos en flujos de efectivo de las ventas
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'LiquidityMeasurementRatios',

  filters: {
    formatNumber: (value: number) => {
      return value ? value.toFixed(2) : '-'
    }
  },

  props: {
    financialRatios: {
      type: Object as () => StockFinancialRatios,
      required: true
    }
  }
})
</script>

<style>

</style>
