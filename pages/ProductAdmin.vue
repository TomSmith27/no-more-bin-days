<template>
  <div>
    <h1>Product Admin</h1>

    <div class="container">
      <transition-group name="list">
        <div v-for="product in products" :key="product.name" class="input-group mb-3">
          <input v-model="product.name" type="text" class="form-control" />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="updateProduct(product)">Update</button>
            <button class="btn btn-danger" type="button" @click="deleteProduct(product)">Delete</button>
          </div>
        </div>
      </transition-group>
      <div class="input-group mb-3">
        <input v-model="newProduct.name" type="text" class="form-control" />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" :disabled="newProduct.name.length == 0" @click="addProduct">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from '@vue/composition-api'
import { DocumentData } from '@firebase/firestore-types'
import ProductsService from '@/features/products/productsService'
import { Product } from '@/features/products/Product'
import { useProducts } from '@/features/products/useProducts'
import firebase from '@/firebase/firebase'
export default defineComponent({
  components: {},
  setup() {
    const productsService = new ProductsService()

    const { orderedProducts, products } = useProducts()

    function updateProduct(product: Product) {
      productsService.productsCollection
        .doc(product.id)
        .update({ name: product.name })
      products.value = [...orderedProducts.value]
    }

    async function deleteProduct(product: Product) {
      try {
        await productsService.productsCollection.doc(product.id).delete()
        products.value = products.value.filter((p) => p.id != product.id)
      } catch (err) {
        console.error(err)
      }
    }

    const newProduct = ref<Product>({
      name: ''
    })

    async function addProduct() {
      try {
        const addedProduct = await productsService.productsCollection.add(
          newProduct.value
        )

        products.value.push({ id: addedProduct.id, ...newProduct.value })
        newProduct.value.name = ''
      } catch (err) {
        console.log(err)
      }
    }

    return { newProduct, updateProduct, deleteProduct, addProduct, products }
  }
})
</script>

<style>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
