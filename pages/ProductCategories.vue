<template>
  <div class="container-fluid">
    <div class="m-3">
      <h1>Product Categories</h1>
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group list-group-flush">
            <li v-for="group in categoriesWithProducts" :key="group.group" class="list-group-item">
              <h3 class="text-primary">{{ group[0].category }}</h3>
              <ul>
                <div v-for="product in group.slice().sort((a, b) => a.name > b.name ? 1 : -1)" :key="product.id">
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'ProductCategories',
  computed: {
    ...mapGetters(['categoriesWithProducts']),

  }
})
</script>

<style>
</style>