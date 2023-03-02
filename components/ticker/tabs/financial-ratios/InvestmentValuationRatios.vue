<template>
  <div class="sb-py-10">
    <div>
      <h2 class="sb-text-2xl sb-font-bold sb-mb-5">
        Ratios de Valoración de Inversiones
      </h2>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Relación Precio-Valor Contable
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over EquityperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceBookValueRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          La relación precio-valor contable, expresada como un múltiplo (es decir, cuántas veces las acciones de una empresa se negocian por acción en comparación con el valor contable por acción de la empresa), es una indicación de cuánto pagan los accionistas por los activos netos de una empresa.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Relación Precio-Flujo de Caja
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over OperatingCashFlowperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceCashFlowRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          La relación precio/flujo de caja es utilizada por los inversionistas para evaluar el atractivo de la inversión, desde el punto de vista del valor de las acciones de una empresa.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Relación Precio-Ganancias
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over EPS $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceEarningsRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Los informes financieros tanto de las empresas como de los servicios de investigación de inversiones utilizan una cifra básica de ganancias por acción (EPS) dividida en el precio actual de las acciones para calcular el múltiplo P/E (es decir, cuántas veces se negocia una acción (su precio) por cada dólar de EPS).
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Relación Precio-Ganancias a Tasa de Crecimiento
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ PriceEarningsRatio \over ExpectedRevenueGrowth $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceEarningsToGrowthRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          La relación PEG, es un refinamiento de la relación P/E y tiene en cuenta el crecimiento de las ganancias estimadas de una acción en su valoración actual. El consenso general es que si la relación PEG indica un valor de 1, esto significa que el mercado está valorando correctamente (la relación P/E actual) una acción de acuerdo con el crecimiento actual estimado de las ganancias por acción de la acción. Si el ratio PEG es inferior a 1, esto significa que el crecimiento del BPA es potencialmente capaz de superar la valoración actual del mercado. En otras palabras, el precio de la acción está siendo infravalorado. Por otro lado, las acciones con altos índices PEG pueden indicar justo lo contrario: que la acción está actualmente sobrevalorada.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Relación Precio-Venta
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over RevenueperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceSalesRatioTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          La relación P/E y P/S refleja cuántas veces los inversionistas están pagando por cada dólar de las ventas de una empresa. Dado que las ganancias están sujetas, en un grado u otro, a estimaciones contables y manipulación de la gestión, muchos inversionistas consideran que la cifra de ventas (ingresos) de una empresa es un componente de relación más confiable para calcular el múltiplo del precio de una acción que la cifra de ganancias.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Rentabilidad por Dividendo
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ DividendperShare \over StockPriceperShare $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.dividendYieldTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Los inversionistas de ingresos valoran una acción que paga dividendos, mientras que los inversionistas de crecimiento tienen poco interés en los dividendos, prefiriendo capturar grandes ganancias de capital. Cualquiera que sea su estilo de inversión, es una cuestión de registro histórico que las acciones que pagan dividendos se han desempeñado mejor que las acciones que no pagan dividendos a largo plazo.
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3 sb-bg-gray-100">
        <div class="sb-w-1/12 sb-text-sm">
          Multiplicador de Valor Empresarial
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ EntrepriseValue \over EBITDA $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.enterpriseValueMultipleTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          En general, esta medición permite a los inversionistas evaluar una empresa sobre la misma base que la de un adquirente. Como un cálculo aproximado, el múltiplo de valor empresarial sirve como un indicador de cuánto tiempo le tomaría a una adquisición ganar lo suficiente para pagar sus costos en años (suponiendo que no haya cambios en el EBITDA).
        </div>
      </div>
      <div class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3">
        <div class="sb-w-1/12 sb-text-sm">
          Precio Valor Razonable (Justo)
        </div>
        <div class="sb-w-5/12 sb-text-[12px]">
          <vue-mathjax formula="$$ StockPriceperShare \over IntrinsicValue $$" />
        </div>
        <div class="sb-w-1/12 sb-text-sm sb-text-center">
          {{ financialRatios.priceFairValueTTM | formatNumber }}
        </div>
        <div class="sb-w-5/12 sb-text-sm">
          Ayuda a los inversionistas a determinar si una acción se cotiza a, por debajo o por encima de su estimación de valor razonable, una relación precio/valor razonable por debajo de 1 sugiere que la acción se está negociando con un descuento sobre su valor razonable, mientras que una relación por encima de 1 sugiere que se está negociando con una prima sobre su valor razonable.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StockFinancialRatios } from '~/models/stock-prices.model'

export default defineComponent({
  name: 'InvestmentValuationRatios',

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
