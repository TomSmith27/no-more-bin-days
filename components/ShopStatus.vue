<template>
  <b-badge class="font-weight-normal" :variant="status.variant">{{status.text}}</b-badge>
</template>

<script lang="ts">
import { Shop } from '@/features/shops/Shop'
import Vue from 'vue'
export default Vue.extend({
  name: 'shop-status',
  components: {},
  props: {
    shop: {
      type: Object as () => Shop,
      required: true
    }
  },
  computed: {
    isOpen(): boolean {
      if (this.shop.is247) {
        return true
      } else {
        let currentDayOfWeek = new Date().getDay() - 1
        if (currentDayOfWeek == -1) {
          currentDayOfWeek = 6
        }
        let openingTimes = this.shop.openingTimes[currentDayOfWeek]

        if (openingTimes.isClosed) {
          return false
        }

        let currentD = new Date()
        let openTime = new Date()
        let openinTimeParts = openingTimes.from.split(':')

        openTime.setHours(
          Number.parseInt(openinTimeParts[0]),
          Number.parseInt(openinTimeParts[1]),
          0
        )

        let closeTime = new Date()
        let closeTimeParts = openingTimes.to.split(':')
        if (closeTimeParts[0] == '00' && closeTimeParts[1] == '00') {
          closeTimeParts[0] = '23'
          closeTimeParts[1] = '59'
        }
        closeTime.setHours(
          Number.parseInt(closeTimeParts[0]),
          Number.parseInt(closeTimeParts[1]),
          0
        )
        return currentD > openTime && currentD < closeTime
      }
    },
    status() {
      if (this.isOpen) {
        return { variant: 'primary', text: 'Open' }
      }

      return { variant: 'danger', text: 'Closed' }
    }
  }
})
</script>

<style>
</style>