<template>
  <div>
    <b-badge :key="product" v-for="product in orderdProducts" variant="primary" class="m-1 white-space-normal">{{product}}</b-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
export default defineComponent({
  props: {
    products: {
      type: Array as () => string[],
      required: true,
    }
  },
  components: {
  },
  setup(props) {

    const orderdProducts = computed(() => {
      return props.products.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
    })
    return { orderdProducts }
  }
});
</script>

<style>
</style>