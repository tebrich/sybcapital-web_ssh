<template>
  <div>
    <h2 class="sb-text-xl sb-font-bold sb-w-full sb-bg-gray-200 sb-px-3">
      {{ values.name }}
    </h2>
    <div class="sb-flex sb-items-center sb-gap-2 sb-my-2">
      <span>{{ values.price }}</span>
      <div v-if="values.value > 0" class="sb-flex sb-items-center sb-gap-1">
        <v-icon color="green">
          mdi-arrow-up-bold-circle
        </v-icon>
        <span class="sb-text-green-600">{{ values.value }}({{ values.percetange }}%)</span>
      </div>
      <div v-else class="sb-flex sb-items-center sb-gap-1">
        <v-icon color="red">
          mdi-arrow-down-bold-circle
        </v-icon>
        <span class="sb-text-red-600">{{ values.value }}({{ values.percetange }}%)</span>
      </div>
    </div>
    <p class="sb-p-0 !sb-m-0 sb-text-[10px] sb-font-light">
      {{ values.date }}
    </p>
    <div class="sb-text-[10px] sb-font-light">
      {{ values.currency }} | {{ values.market }} | PREVIOUS DAY PRICE
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureStockPrice',
  props: {
    values: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
