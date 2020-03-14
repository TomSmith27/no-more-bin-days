import { GetterTree, ActionTree, MutationTree } from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Shop } from '~/features/shops/Shop';
import ProductsService from '~/features/products/productsService';
import ShopsService from '~/services/shopsService';
import { Product } from '~/features/products/Product';
const productService = new ProductsService();
const shopsService = new ShopsService();

export const state = () => ({
	user: {
		email: ''
	},
	shops: [] as Shop[],
	products: [] as Product[],
	tips: [
		'Check frozen veg packets - they can often be recycled with carrier bags!',
		'Did you know you can recycle the net and tags from certain fruit with carrier bags? Check the label!',
		'Remember to take your own containers to supermarket deli counters - lots of supermarkets are happy to use them!',
		'Did you know that corks can be composted?',
		'Having a party? Waitrose offers free glass loan! Other supermarkets do too - check their website or ask in-store!',
		'Browse the Products A-Z page to see all products that can be recycled'
	] as String[],
	installPrompt: null as Event | null
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
	isLoggedIn(state) {
		return state.user.email.length > 0;
	},
	user(state) {
		return state.user;
	},
	orderedProducts(state): Product[] {
		return state.products.slice().sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
	},
	groupedProducts(state, { orderedProducts }): object {
		return orderedProducts.reduce((r: any, e: Product) => {
			// get first letter of name of current element
			const group = e.name[0];
			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, products: [ e ] };
			else
				// if there is push current element to children array for that letter
				r[group].products.push(e);
			// return accumulator
			return r;
		}, {});
	},
	categoriesWithProducts(state) {
		return groupBy(state.products, 'category').sort((a, b) => (a[0].category > b[0].category ? 1 : -1));
	},
	tips(state) {
		return state.tips;
	}
};

export const mutations: MutationTree<RootState> = {
	setUser(state, user) {
		state.user = user;
	},
	setShops(state, shops: Shop[]) {
		state.shops = shops;
	},
	setProducts(state, products: Product[]) {
		state.products = products;
	},
	setInstallPrompt(state, prompt: Event) {
		state.installPrompt = prompt;
	}
};

export const actions: ActionTree<RootState, RootState> = {
	LOGIN({ commit }, payload) {
		firebase
			.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then((response) => {
				if (response.user && response.user.email) {
					window.localStorage.setItem('recycle-user', response.user.email);
					commit('setUser', response.user);
				}
			})
			.catch(function(error) {
				// Handle Errors here.
				alert(error);
				// ...
			});
	},
	LOGOUT({ commit }) {
		firebase.auth().signOut();
		window.localStorage.removeItem('recycle-user');
		commit('setUser', {
			email: ''
		});
	},

	async loadData({ commit }) {
		let shops = await shopsService.get();
		let products = await productService.getProducts();
		commit('setShops', shops);
		commit('setProducts', products);
	},

	async nuxtServerInit({ dispatch }) {
		await dispatch('loadData');
		return;
	}
};

function groupBy(collection: any[], property: string) {
	var i = 0,
		val,
		index,
		values = [],
		result = [];
	for (; i < collection.length; i++) {
		val = collection[i][property];
		index = values.indexOf(val);
		if (index > -1) result[index].push(collection[i]);
		else {
			values.push(val);
			result.push([ collection[i] ]);
		}
	}
	return result;
}
