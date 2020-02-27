import { GetterTree, ActionTree, MutationTree } from 'vuex';
import firebase from 'firebase';
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
	products: [] as Product[]
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

/* const store = () =>
	new Vuex.Store({
		state: {
			user: {
				email: ''
			},
			shops: [] as Shop[],
			products: [] as Product[]
		},
		mutations: {
			setUser(state, user) {
				state.user = user;
			},
			setShops(state, shops: Shop[]) {
				state.shops = shops;
			},
			setProducts(state, products: Product[]) {
				state.products = products;
			}
		},
		actions: {
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

			async nuxtServerInit({ commit }) {
				let shops = await shopsService.get();
				let products = await productService.getProducts();
				commit('setShops', shops);
				commit('setProducts', products);
			}
		},
		modules: {},
		getters: {
			isLoggedIn(state) {
				return state.user.email.length > 0;
			},
			user(state) {
				return state.user;
			}
		}
	});

export default store;
 */
