<template>
  <div :class="{'sb-flex sb-flex-row-reverse sb-items-center sb-justify-between sb-gap-2': mobile, 'sb-h-full': !mobile}" class="sb-border-b-[2px] sb-border-r-gray-500 sb-border-opacity-10 sb-py-3 sb-cursor-pointer hover:sb-opacity-50">
    <v-img
      :width="!mobile ? 580 : 260"
      :height="!mobile ? 300 : 140"
      class="sb-w-full"
      :class="[!mobile ? 'sb-h-[400px]' : 'sb-h-[140px]']"
      cover
      src="https://u3j7m9h7.rocketcdn.me/wp-content/uploads/2022/12/cheap-stocks-to-buy-now-1160x620.jpg"
    />
    <div>
      <h2 class="sb-font-bold" :class="[!mobile ? 'sb-text-3xl sb-my-2' : 'sb-text-xl sb-mb-2']">
        Cheap Stocks To Buy Now? 2 Tech Stocks To Know
      </h2>
      <p class="sb-font-light !sb-mb-2" :class="[!mobile ? 'sb-text-xl' : 'sb-text-sm']">
        Are these tech stocks a good buy at their current price levels?
      </p>
      <div class="sb-flex sb-items-center sb-justify-start sb-gap-2">
        <span class="sb-flex sb-items-center sb-justify-center sb-font-light" :class="[!mobile ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']">
          <v-icon :size="!mobile ? 14 : 10" color="primary">mdi-share-variant-outline</v-icon>
          2 compartidos
        </span>
        <span class="sb-flex sb-items-center sb-justify-center sb-font-light" :class="[!mobile ? 'sb-text-[14px] sb-gap-1' : 'sb-text-[10px] sb-gap-2']">
          <v-icon :size="!mobile ? 14 : 10" color="primary">mdi-timer-outline</v-icon>
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
    mobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
