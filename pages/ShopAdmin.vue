<template>
  <div class="container-fluid">
    <div class="m-3">
      <div class="pb-2">
        <router-link :to="{ name: 'AddShop' }">
          <button type="button" class="btn btn-primary btn-block">Add Shop</button>
        </router-link>
      </div>
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sticky-header="80vh" bordered striped hover :items="shops" :fields="fields">
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
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import ShopsService from '../services/shopsService'
import { Shop } from '../features/shops/Shop'
import ProductsService from '@/features/products/productsService'
export default defineComponent({
  components: {},
  setup(props, context) {
    const shopService = new ShopsService()

    const shops = ref<Shop[]>([])
    onMounted(async () => (shops.value = await shopService.get()))

    const fields = [
      { key: 'name', sortable: true },
      { key: 'address', sortable: true },
      { key: 'products', sortable: true },

      'edit',
      'delete'
    ]
    const sortBy = ref('name')
    const sortDesc = ref(false)

    async function deleteShop(id: string) {
      await shopService.delete(id)
      shops.value = shops.value.filter((f: any) => f.id != id)
    }

    return { shops, deleteShop, fields, sortBy, sortDesc }
  }
})
</script>
<style></style>
