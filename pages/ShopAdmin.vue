<template>
  <div class="container-fluid">
    <div class="m-3">
      <div class="pb-2">
        <router-link :to="{ name: 'AddShop' }">
          <button type="button" class="btn btn-primary btn-block">Add Shop</button>
        </router-link>
      </div>
      <b-form-input class="mb-2" v-model="nameFilter" placeholder="Search Shops"></b-form-input>
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sticky-header="80vh" bordered striped hover :items="filteredShops" :fields="fields">
        <template v-slot:cell(name)="{ item }">
          <div>
            <img :src="item.imageUrl" class="img" />
            {{item.name}}
          </div>
        </template>
        <template v-slot:cell(products)="{ item }">
          <div>
            <b-badge v-for="product in item.products" :key="product" variant="primary" class="ml-1">{{ product }}</b-badge>
          </div>
        </template>
        <template v-slot:cell(edit)="{ item }">
          <nuxt-link :to="{ name: 'EditShop-id', params: { id: item.id } }">
            <button class="btn btn-primary">Edit</button>
          </nuxt-link>
        </template>
        <template v-slot:cell(delete)="{ item }">
          <button type="button" class="btn btn-danger" @click="deleteShop(item.id)">Delete</button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import ShopsService from '../services/shopsService'
import { Shop } from '../features/shops/Shop'
import ProductsService from '@/features/products/productsService'
import Vue from 'vue'
const shopService = new ShopsService()
export default Vue.extend({
  components: {},
  async mounted() {
    this.shops = await shopService.get()
  },
  data() {
    return {
      shops: [] as Shop[],
      sortBy: 'name',
      sortDesc: false,
      nameFilter: ''
    }
  },
  computed: {
    fields(): Array<any> {
      return [
        { key: 'name', sortable: true },
        { key: 'address', sortable: true },
        { key: 'products', sortable: true },

        'edit',
        'delete'
      ]
    },
    filteredShops(): Array<Shop> {
      if (this.nameFilter.length > 0) {
        return this.shops.filter(s => s.name.toLowerCase().includes(this.nameFilter))
      }
      return this.shops;
    }
  },
  methods: {
    async deleteShop(id: string) {
      await shopService.delete(id)
      this.shops = this.shops.filter((f) => f.id != id)
    }
  }
})
</script>
<style>
.img {
  max-height: 100px;
  max-width: 100px;
}
</style>
