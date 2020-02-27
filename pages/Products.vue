<template>
  <div class="container-fluid">
    <div class="m-3">
      <h1>Product List</h1>
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group list-group-flush">
            <li v-for="group in groupedProducts" :key="group.group" class="list-group-item">
              <h3 class="text-primary">{{ group.group }}</h3>
              <ul>
                <div v-for="product in group.products" :key="product.id">
                  <b-badge class="big-badge white-space-normal" :to="{ name: 'index', query: { product: product.name } }" variant="primary">{{ product.name }}</b-badge>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/features/products/Product'
import Vue from 'vue'
import { RootState, getters } from '../store'
export default Vue.extend({
  name: 'Products',
  computed: {
    groupedProducts(): object {
      return this.$store.getters.groupedProducts
    }
  }
})
</script>
