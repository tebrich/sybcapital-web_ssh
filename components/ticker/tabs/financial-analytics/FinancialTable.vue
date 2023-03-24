<template>
  <div
    class="sb-flex sb-py-4 sb-border-2 sb-border-t-0 sb-border-gray-200 sb-px-3"
    :class="{'sb-bg-gray-100': middle}"
  >
    <div class="sb-w-2/12 sb-text-sm">
      {{ title }}
    </div>
    <div class="sb-w-2/12 sb-text-[12px] sb-text-center">
      {{ current | formatNumber }}
    </div>
    <div class="sb-w-2/12 sb-text-sm sb-text-center sb-text-center">
      {{ old | formatNumber }}
    </div>
    <div class="sb-w-2/12 sb-text-sm sb-text-center">
      {{ current - old | formatNumber }}
    </div>
    <div class="sb-w-2/12 sb-text-sm sb-text-center">
      {{ ((current - old) / old) * 100 | formatNumber }}
    </div>
    <div class="sb-w-2/12 sb-text-sm sb-text-center">
      {{ ((pc - current) / pc) * 100 | formatNumber }}
    </div>
    <div class="sb-w-2/12 sb-text-sm sb-text-center" :class="[((pc - current) / pc) * 100 > 0 ? 'sb-text-green-500' : 'sb-text-red-500']">
      <template v-if="strength">
        <span v-if="((pc - current) / pc) * 100 < 0">-</span>{{ strength }}
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FinancialTable',

  filters: {
    formatNumber(value) {
      return value ? value.toFixed(2) : 0
    }
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    current: {
      type: Number,
      default: 0
    },
    old: {
      type: Number,
      default: 0
    },
    pc: {
      type: Number,
      default: 0
    },
    strength: {
      type: Number,
      default: null
    },
    middle: {
      type: Boolean,
      default: false
    }
  }
})
</script>
