<template>
  <div :class="{'sb-flex sb-flex-row-reverse sb-items-center sb-justify-between sb-gap-3': small, 'sb-h-full': !small}" class="sb-border-b-[2px] sb-border-r-gray-500 sb-border-opacity-10 sb-py-3 sb-cursor-pointer hover:sb-opacity-50">
    <v-img
      :width="!small ? 580 : 260"
      :height="!small ? 300 : 140"
      class="sb-w-full"
      :class="[!small ? 'sb-h-[400px]' : 'sb-h-[140px]']"
      cover
      src="https://u3j7m9h7.rocketcdn.me/wp-content/uploads/2022/12/cheap-stocks-to-buy-now-1160x620.jpg"
    />
    <div :class="{'sb-w-8/12': small}">
      <h2 class="sb-font-bold" :class="[!small ? 'sb-text-3xl sb-my-2' : 'sb-text-xl sb-mb-2']">
        Cheap Stocks To Buy Now? 2 Tech Stocks To Know
      </h2>
      <p class="sb-font-light !sb-mb-2" :class="[!small ? 'sb-text-xl' : 'sb-text-sm']">
        Are these tech stocks a good buy at their current price levels?
      </p>
      <div class="sb-flex sb-items-center sb-justify-start sb-gap-2">
        <span class="sb-flex sb-items-center sb-justify-center sb-font-light" :class="[!small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']">
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-share-variant-outline</v-icon>
          2 compartidos
        </span>
        <span class="sb-flex sb-items-center sb-justify-center sb-font-light" :class="[!small ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']">
          <v-icon :size="!small ? 14 : 10" color="primary">mdi-timer-outline</v-icon>
          3 min. de lectura
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewNewsContainer',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
