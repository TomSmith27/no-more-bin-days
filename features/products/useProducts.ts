import { ref, onMounted, computed } from '@vue/composition-api';
import { Product } from './Product';
import ProductsService from './productsService';

export function useProducts() {
	const productService = new ProductsService();
	let products = ref<Product[]>([]);
	const orderedProducts = computed(() =>
		products.value.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
	);
	onMounted(async () => {
		products.value = await productService.getProducts();
		products.value = [ ...orderedProducts.value ];
	});
	return { orderedProducts, products };
}
