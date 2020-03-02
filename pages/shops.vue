<template>
  <div class="container-fluid">
    <div class="m-3 p-4 border shadow-sm">
      <h1>All Locations</h1>
      <b-table stacked="md" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sticky-header="80vh" striped hover :items="shops" :fields="fields">
        <template v-slot:cell(products)="{ item }">
          <product-badges :products="item.products" />
        </template>

        <template v-slot:cell(openingTimes)="{ item }">
          <div class="opening-hours-table-button">
            <button v-b-toggle="`opening-hours-${item.id}`" class="btn btn-outline-primary btn-block">
              Opening Hours
              <b-icon-chevron-compact-down />
            </button>
            <b-collapse :id="`opening-hours-${item.id}`" class="border-top-0 border border-primary bg-white">
              <div class="d-flex justify-content-cente p-2">
                <div v-if="item.is247">
                  <em>24/7</em>
                </div>
                <div v-else-if="item.externalOpeningHours">
                  <a target="_blank" :href="item.externalWebsite">Click here for Opening Hours</a>
                </div>
                <div v-else>
                  <div v-for="openingTime in item.openingTimes" :key="openingTime.day" class="d-flex">
                    <span class="mr-1" style="width : 100px">{{ openingTime.day }} :</span>
                    <span v-if="openingTime.isClosed">CLOSED</span>
                    <span v-else>{{ openingTime.from }} - {{ openingTime.to }}</span>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Shop } from '@/features/shops/Shop'
import ProductBadges from '@/components/ProductBadges.vue'
import Vue from 'vue'
import { RootState } from '~/store'
export default Vue.extend({
  components: {
    ProductBadges
  },
  async mounted() {
    this.shops = (this.$store.state as RootState).shops
  },
  data() {
    return {
      shops: [] as Shop[],
      sortBy: 'name',
      sortDesc: false
    }
  },
  computed: {
    fields() {
      return [
        { key: 'name', sortable: true },
        { key: 'address', sortable: true },
        { key: 'products', sortable: true },
        { key: 'openingTimes', sortable: false }
      ]
    }
  },
  head() {
    return {
      title: 'Locations - No More Bin Days',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: `Here you can find all the recycling locations in Sheffield - whether that's recycling bins in a car park, on the road-side, in a shop or a supermarket.`
        }
      ]
    }
  }
})
</script>

<style></style>
