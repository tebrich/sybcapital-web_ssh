<template>
  <div class="!sb-p-0 !sb-m-0 sb-rounded-md sb-bg-gray-100">
    <div class="sb-w-full sb-h-[250px] trading-bg sb-relative sb-p-0 sb-m-0">
      <div class="sb-w-full sb-h-[250px] sb-absolute sb-top-0 sb-left-0 sb-bg-black sb-opacity-70"></div>
      <div class="sb-z-10 sb-relative sb-py-8 sb-px-3">
        <h3 class="sb-font-extrabold sb-text-white sb-text-2xl">
          Sign up for our <span class="sb-text-secondary">FREE Newsletter</span> and get:
        </h3>
        <div class="sb-text-white sb-mt-3">
          <div class="sb-flex sb-items-center sb-gap-1">
            <v-icon class="!sb-text-secondary">
              mdi-check-bold
            </v-icon>
            <p class="!sb-m-0">
              Weekly market updates
            </p>
          </div>
          <div class="sb-flex sb-items-center sb-gap-1">
            <v-icon class="!sb-text-secondary">
              mdi-check-bold
            </v-icon>
            <p class="!sb-m-0">
              Stock picks
            </p>
          </div>
          <div class="sb-flex sb-items-center sb-gap-1">
            <v-icon class="!sb-text-secondary">
              mdi-check-bold
            </v-icon>
            <p class="!sb-m-0">
              Trading tips
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="sb-px-2">
      <subscribe-form dismind-detail dismind-title notice-black />
    </div>
  </div>
</template>

<script>
import SubscribeForm from './SubscribeForm.vue'

export default {
  name: 'SubscribeNewsLetter',

  components: {
    SubscribeForm
  }
}
</script>

<style scoped>
.trading-bg{
    background-image: url('@/assets/img/jpg/trading-view.jpeg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>
