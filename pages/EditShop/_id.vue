<template>
  <div class="container">
    <div class="card m-2 p-4 shadow">
      <h1>Edit Shop</h1>
      <form @submit.prevent="editShop">
        <shop-form v-model="shop"></shop-form>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import ShopForm from '@/components/shop-form.vue'
import ShopsService from '@/services/shopsService';
import { Shop } from '@/features/shops/Shop';
export default defineComponent({
  components: {
    ShopForm
  },
  props: {
    id: String
  },
  setup(props, { root }) {
    let shopId = root.$router.currentRoute.params.id
    const shopService = new ShopsService()
    let shop = ref<Shop>({})

    onMounted(async () => {
      if (shopId) {
        shop.value = await shopService.getById(shopId) as Shop;
        console.log(shop.value);
      }
    })


    async function editShop() {
      await shopService.update(shopId!, shop.value)

      root.$router.push({ name: 'shop-admin' })

    }

    return { shop, editShop }
  }
});
</script>

<style>
</style>