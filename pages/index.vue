<template>
  <div>
    <div class="d-flex justify-content-center align-items-center pt-5" v-if="$store.state.installPrompt != null">
      <b-btn variant="outline-primary" @click="install">Install App here!</b-btn>
    </div>
    <div class="d-flex justify-content-center flex-column align-items-center overflow-auto home" :class="{'offset-search' : filteredShops.length == 0}">
      <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center flex-column mb-3 bg-white border shadow-sm p-2">
          <div class="d-flex justify-content-center align-items-center w-100 mb-1">
            <h3>Where can I recycle</h3>
          </div>
          <b-select class="mx-2 w-75 mb-2" v-model="selectedProduct" :options="orderedProducts" value-field="name" text-field="name" @change="productChange"></b-select>
          <h3>in Sheffield?</h3>
        </div>
      </div>
      <b-alert :show="filteredShops.length == 0" variant="success" class="text-center m-2">
        <b-icon icon="info-square" class="mr-3" scale="1.5"></b-icon>
        <strong>Top Tip</strong>
        : {{tip}}
      </b-alert>

      <div class="container-fluid">
        <b-alert class="text-center" variant="danger" :show="filteredShops.length == 0 && selectedProduct != null">Can't be recycled</b-alert>
        <div class="shops">
          <b-card class="shadow shop-card mb-2 p-1 text-center" img-top img-width="100%" img-height="100%" :key="s.id" v-for="s in filteredShops">
            <div class="d-flex align-items-center mb-2 justify-content-between">
              <b-card-title class="mb-0">{{s.name}}</b-card-title>
              <shop-status :shop="s"></shop-status>
              <b-card-img v-if="s.imageUrl" top :src="s.imageUrl"></b-card-img>
              <div v-else style="width : 100px"></div>
            </div>
            <div>
              <small>{{getDistanceToLocation(s) | miles}}</small>
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
import ShopStatus from '@/components/ShopStatus.vue'
import Vue from 'vue'
import { Shop } from '../features/shops/Shop'
import { Product } from '@/features/products/Product'
import ProductBadges from '@/components/ProductBadges.vue'
import { RootState } from '~/store'
import { mapGetters } from 'vuex'
import { analytics } from 'firebase'


export default Vue.extend({
  components: {
    ShopStatus,
    ProductBadges
  },
  data() {
    return {
      products: [] as Product[],
      shops: [] as Shop[],
      selectedProduct: null as String | null,
      tip: '',
      location: null as Coordinates | null
    }
  },
  async created() {
    const state = this.$store.state as RootState
    this.shops = JSON.parse(JSON.stringify(state.shops))
    var routeProduct = this.$router.currentRoute.query['product']
    if (routeProduct != undefined && routeProduct != null) {
      this.selectedProduct = routeProduct as string
    }
    this.tip = this.tips[Math.floor(Math.random() * this.tips.length)]
  },
  async mounted() {
    this.getLocation()
  },
  computed: {
    ...mapGetters(['orderedProducts', 'tips']),

    filteredShops(): Shop[] {
      if (this.selectedProduct != null) {
        let sortFunction
        if (this.location != null) {
          sortFunction = (a: Shop, b: Shop) =>
            this.getDistanceToLocation(a) > this.getDistanceToLocation(b)
              ? 1
              : -1
        } else {
          sortFunction = (a: Shop, b: Shop) => (b.name > a.name ? 1 : -1)
        }

        return this.shops
          .sort(sortFunction)
          .filter((s) =>
            s.products.some(
              (i: string) =>
                i.toLowerCase() == this.selectedProduct!.toLowerCase()
            )
          )
      }
      return []
    }
  },
  methods: {
    install() {
      const deferredPrompt = this.$store.state.installPrompt as any
      console.log('install')
      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    },
    productChange() {
      analytics().logEvent('product_selected', { value: this.selectedProduct });
      this.getLocation();
    },
    getLocation(): void {
      if (process.client && this.location == null) {
        navigator.geolocation.getCurrentPosition(
          (result) => {
            this.location = result.coords
          },
          (e) => {
            console.error(e)
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0
          }
        )
      }
    },
    getDistanceToLocation(shop: Shop): number {
      if (this.location != null) {
        return this.distance(
          shop.latitude,
          shop.longitude,
          this.location.latitude,
          this.location.longitude,
          'M'
        )
      }
      return 0
    },
    mapUrl(shop: Shop) {
      return `http://maps.google.com/?q=${shop.address}`
    },
    distance(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
      unit: string
    ) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0
      } else {
        var radlat1 = (Math.PI * lat1) / 180
        var radlat2 = (Math.PI * lat2) / 180
        var theta = lon1 - lon2
        var radtheta = (Math.PI * theta) / 180
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == 'K') {
          dist = dist * 1.609344
        }
        if (unit == 'N') {
          dist = dist * 0.8684
        }

        if (isNaN(dist)) {
          return 100000
        }
        return dist
      }
    }
  },
  filters: {
    miles(val: number) {
      if (val == 100000) {
        return ''
      }
      if (val != 0) {
        return `${Math.round((val + Number.EPSILON) * 100) / 100} miles away`
      }
      return ''
    }
  },
  head() {
    return {
      title: 'No More Bin Days',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'No More Bin Days',
          content: `No More Bin Days was created to address the lack of information on where to recycle products that aren't accepted in our household bins. Search now and find out what to recycle where!`
        }
      ]
    }
  }
})
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

.shop-card {
  img {
    max-height: 100px;
    max-width: 100px;
  }
}

.home {
  transition: margin 500ms;
  margin-top: 5vh;
}
.offset-search {
  margin-top: 15vh;
}
</style>
