<template>
  <div class="container">
    <div class="card m-2 p-4 shadow">
      <h1>Edit Shop</h1>
      <form novalidate @submit.prevent="editShop">
        <shop-form v-model="shop"></shop-form>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import ShopForm from '@/components/shop-form.vue'
import ShopsService from '@/services/shopsService'
import { Shop } from '@/features/shops/Shop'
import Vue from 'vue'
const shopService = new ShopsService()
export default Vue.extend({
  components: {
    ShopForm
  },
  data() {
    return {
      shop: {} as Shop
    }
  },
  async mounted() {
    if (this.id) {
      this.shop = (await shopService.getById(this.id)) as Shop
    }
  },
  computed: {
    id() {
      return this.$router.currentRoute.params.id
    }
  },
  methods: {
    async editShop() {
      await shopService.update(this.id, this.shop)

      this.$router.push({ name: 'ShopAdmin' })
    }
  }
})
</script>

<style>
</style>