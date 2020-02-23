import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const store = () =>
	new Vuex.Store({
		state: {
			user: {
				email: ''
			}
		},
		mutations: {
			setUser(state, user) {
				state.user = user;
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
