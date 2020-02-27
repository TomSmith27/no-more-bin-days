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
import ProductsService from '@/features/products/productsService'
import { Product } from '@/features/products/Product'
import Vue from 'vue'
const productService = new ProductsService()
export default Vue.extend({
  name: 'Products',
  data() {
    return {
      products: [] as Product[]
    }
  },
  async mounted() {
    this.products = await productService.getProducts()
  },
  computed: {
    orderedProducts(): Product[] {
      return this.products.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
    },
    groupedProducts(): object {
      return this.orderedProducts.reduce((r: any, e: Product) => {
        // get first letter of name of current element
        const group = e.name[0]
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, products: [e] }
        // if there is push current element to children array for that letter
        else r[group].products.push(e)
        // return accumulator
        return r
      }, {})
    }
  }
})
</script>
