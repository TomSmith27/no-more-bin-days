<template>
  <div>
    <div class="form-row">
      <div class="form-group col">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" placeholder="Name" @input="onChange" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">Address</label>
      <textarea class="form-control" rows="3" v-model="address" @input="onChange"></textarea>
    </div>

    <div class="form-group">
      <label for="inputAddress">Shop Type</label>
      <b-form-select v-model="shopType" :options="shopTypes" @input="onChange"></b-form-select>
    </div>

    <b-form-group label="Products this shop can recycle">
      <!-- prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <b-form-tags v-model="selectedProducts" size="lg" add-on-change no-outer-focus class="mb-2" @input="onChange">
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="primary">{{ tag }}</b-form-tag>
            </li>
          </ul>
          <b-form-select v-bind="inputAttrs" v-on="inputHandlers" text-field="name" value-field="name" :disabled="disabled || availableOptions.length === 0" :options="availableOptions">
            <template v-slot:first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value>Choose a product...</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-form-group>

    <b-form-group label-cols-lg="2" label="Opening Hours :" class="mb-0">
      <b-form-group label-cols-sm="2" label="Open 24/7?:" id="allDay">
        <b-form-checkbox v-model="is247" name="checkbox-1" @input="onChange"></b-form-checkbox>
      </b-form-group>
      <b-form-group label-cols-sm="3" label="External Opening Hours:" id="allDay">
        <b-form-checkbox id="externalOpeningHours" v-model="externalOpeningHours" @input="onChange"></b-form-checkbox>
        <div class="form-group" v-if="externalOpeningHours">
          <label for>Website</label>
          <input type="text" class="form-control" v-model="externalWebsite" @input="onChange" />
        </div>
      </b-form-group>
      <b-form-group :key="openingTime.day" v-for="(openingTime, index) in openingTimes" label-cols-xs="2" :label="openingTime.day" v-if="!is247 && !externalOpeningHours">
        <button @click="fillDown(index)" type="button" class="btn btn-primary btn-sm">
          <b-icon-arrow-bar-bottom></b-icon-arrow-bar-bottom>
        </button>
        <vue-timepicker :disabled="openingTime.isClosed" @input="onChange" v-model="openingTime.from" auto-scroll :minute-interval="10" close-on-complete input-width="5em"></vue-timepicker>
        <span class="px-2">to :</span>
        <vue-timepicker :disabled="openingTime.isClosed" @input="onChange" v-model="openingTime.to" auto-scroll :minute-interval="10" close-on-complete input-width="5em"></vue-timepicker>
        <b-form-checkbox inline v-model="openingTime.isClosed" @input="onChange">Closed</b-form-checkbox>
      </b-form-group>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watch,
  PropType
} from '@vue/composition-api';
import ShopsService from '@/services/shopsService';
import ProductsService from '@/features/products/productsService';
import { Shop } from '../features/shops/Shop';
import { PropOptions } from 'vue';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import { OpeningTimes } from '@/features/shops/OpeningHours';
import { Product } from '@/features/products/Product';
export default defineComponent({
  model: {
    prop: 'shop',
    event: 'input'
  },
  props: {
    shop: {
      type: Object as () => Shop,
      required: true
    }
  },
  components: {
    VueTimepicker
  },
  setup(props, { emit }) {
    const productService = new ProductsService();
    const shopService = new ShopsService();
    const options = ref<Product[]>([]);
    let name = ref(props.shop.name);
    let address = ref(props.shop.address);
    let is247 = ref(false);
    let externalOpeningHours = ref(false);
    let externalWebsite = ref('');
    let openingTimes = ref<OpeningTimes[]>([
      { day: 'Monday', from: '', to: '', isClosed: false },
      { day: 'Tuesday', from: '', to: '', isClosed: false },
      { day: 'Wednesday', from: '', to: '', isClosed: false },
      { day: 'Thursday', from: '', to: '', isClosed: false },
      { day: 'Friday', from: '', to: '', isClosed: false },
      { day: 'Saturday', from: '', to: '', isClosed: false },
      { day: 'Sunday', from: '', to: '', isClosed: false }
    ]);

    openingTimes.value.forEach(o => {
      o.from = '09:00';
      o.to = '17:00';
    });
    let shopType = ref('Shop');
    let shopTypes = ref([
      'Shop',
      'Roadside',
      'Car park',
      'Community',
      'Recycling Centre'
    ]);

    onMounted(async () => {
      options.value = await productService.getProducts();
    });
    let selectedProducts = ref<string[]>(props.shop.products);
    const availableOptions = computed(() => {
      if (selectedProducts.value) {
        return options.value.filter(
          opt => selectedProducts.value.indexOf(opt.name) === -1
        )
          .sort(((a, b) => a.name > b.name ? 1 : -1))
      }

      return []
    }
    );

    watch(() => {
      name.value = props.shop.name;
      address.value = props.shop.address;
      selectedProducts.value = props.shop.products;
      openingTimes.value = props.shop.openingTimes;
      shopType.value = props.shop.shopType;
      is247.value = props.shop.is247;
      externalOpeningHours.value = props.shop.externalOpeningHours;
      externalWebsite.value = props.shop.externalWebsite;
    });

    const onChange = () => {
      emit('input', {
        name: name.value,
        address: address.value,
        products: selectedProducts.value,
        shopType: shopType.value,
        openingTimes: openingTimes.value,
        is247: is247.value,
        externalOpeningHours: externalOpeningHours.value,
        externalWebsite: externalWebsite.value
      });
    };

    function fillDown(index: number) {
      var values = openingTimes.value[index];
      openingTimes.value.forEach((value, i) => {
        if (i > index) {
          value.from = values.from;
          value.to = values.to;
          value.isClosed = values.isClosed;
        }
      });
      onChange();
    }

    return {
      name,
      address,
      options,
      selectedProducts,
      availableOptions,
      onChange,
      is247,
      openingTimes,
      shopType,
      shopTypes,
      fillDown,
      externalOpeningHours,
      externalWebsite
    };
  }
});
</script>

<style lang="scss" >
#allDay {
  div.bv-no-focus-ring {
    display: flex;
    align-items: center;
  }
}
</style>