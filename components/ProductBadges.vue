<template>
  <div>
    <b-badge :key="product" v-for="product in orderedProducts" variant="primary" class="m-1 white-space-normal">{{product}}</b-badge>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    products: {
      type: Array as () => string[],
      required: true
    }
  },
  computed: {
    orderedProducts() {
      return this.products.sort((a, b) =>
        a.toLowerCase() > b.toLowerCase() ? 1 : -1
      )
    }
  }
})
</script>

<style>
</style>