<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height : 90vh">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        <h1 class="text-primary">Loading...</h1>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center flex-column align-items-center overflow-auto home" :class="{'offset-search' : filteredShops.length == 0}">
      <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center flex-column mb-3 bg-white border shadow-sm p-2">
          <div class="d-flex justify-content-center align-items-center w-100 mb-1">
            <h3>Where can I recycle</h3>
          </div>
          <b-select class="mx-2 w-75 mb-2" v-model="selectedProduct" :options="orderedProducts" value-field="name" text-field="name"></b-select>
          <h3>in Sheffield?</h3>
        </div>
      </div>
      <b-alert :show="filteredShops.length == 0" variant="success" class="text-center m-2">
        <b-icon icon="info-square" class="mr-3" scale="1.5"></b-icon>
        <strong>Top Tip</strong> : Did you know that corks can be composted?
      </b-alert>

      <div class="container-fluid">
        <b-alert class="text-center" variant="danger" :show="filteredShops.length == 0 && selectedProduct != null && !isLoading">Can't be recycled</b-alert>
        <div class="shops">
          <b-card class="shadow mb-2" :key="s.id" v-for="s in filteredShops">
            <div class="d-flex align-items-center mb-2 justify-content-between">
              <b-card-title class="mb-0">{{s.name}}</b-card-title>
              <shop-status :shop="s"></shop-status>
            </div>

            <b-card-text>
              <a v-if="!s.address.includes('See website')" target="_blank" :href="mapUrl(s)">{{s.address}}</a>
              <span v-else>{{s.address}}</span>
            </b-card-text>
            <div class="pb-2">
              <button class="btn btn-outline-primary btn-block" v-b-toggle="`products-${s.id}`">
                What else can I recycle here?
                <b-icon-chevron-compact-down />
              </button>
              <b-collapse :id="`products-${s.id}`" class="border-top-0 border border-primary">
                <product-badges class="p-2" :products="s.products" />
              </b-collapse>
            </div>
            <div>
              <button class="btn btn-outline-primary btn-block" v-b-toggle="`opening-hours-${s.id}`">
                Opening Hours
                <b-icon-chevron-compact-down />
              </button>
              <b-collapse :id="`opening-hours-${s.id}`" class="border-top-0 border border-primary">
                <div class="d-flex justify-content-center p-2">
                  <div v-if="s.is247">
                    <em>24/7</em>
                  </div>
                  <div v-else-if="s.externalOpeningHours">
                    <a target="_blank" :href="s.externalWebsite">Click here for Opening Hours</a>
                  </div>
                  <div v-else>
                    <div :key="openingTime.day" v-for="openingTime in s.openingTimes" class="d-flex">
                      <span class="mr-1" style="width : 100px">{{openingTime.day}} :</span>
                      <span v-if="openingTime.isClosed">CLOSED</span>
                      <span v-else>{{openingTime.from}} - {{openingTime.to}}</span>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ShopStatus from '@/components/ShopStatus.vue';
import db from '@/firebase/firebase';
import Vue from 'vue';
import {
  defineComponent,
  ref,
  computed,
  onMounted
} from '@vue/composition-api';
import { DocumentData } from '@firebase/firestore-types';
import ProductsService from '@/features/products/productsService';
import ShopsService from '../services/shopsService';
import { Shop } from '../features/shops/Shop';
import { Product } from '@/features/products/Product';
import { useProducts } from '@/features/products/useProducts'
import ProductBadges from "@/components/ProductBadges.vue";
export default defineComponent({
  components: {
    ShopStatus,
    ProductBadges
  },
  setup(props, context) {
    const productService = new ProductsService();
    const shopsService = new ShopsService();

    let { orderedProducts, products } = useProducts()
    let selectedProduct = ref<string>(null);

    var routeProduct = context.root.$router.currentRoute.query["product"];
    if (routeProduct != undefined && routeProduct != null) {
      selectedProduct.value = routeProduct as string;
    }

    let shops = ref<Shop[]>([]);
    let isLoading = ref(true)
    onMounted(async () => {
      isLoading.value = true;
      products.value = await productService.getProducts();
      shops.value = await shopsService.get();
      isLoading.value = false;
    });

    const filteredShops = computed(() => {
      if (selectedProduct.value != null) {
        return shops.value
          .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
          .filter(s =>
            s.products.some(
              (i: string) =>
                i.toLowerCase() ==
                selectedProduct.value!.toLowerCase()
            )
          );
      }
      return [];
    });

    let mapUrl = (shop: Shop) => {
      return `http://maps.google.com/?q=${shop.address}`;
    }

    return { orderedProducts, selectedProduct, filteredShops, mapUrl, isLoading };
  }
});
</script>

<style lang="scss" scoped>
.shops {
  display: grid;
  grid-gap: 5px;
}
@media (min-width: 991.98px) {
  .shops {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.home {
  transition: margin 500ms;
  margin-top: 5vh;
}
.offset-search {
  margin-top: 25vh;
}
</style>
