import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth.module';
import storeModule from './modules/store.module';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		modules: {
			authModule,
			storeModule
		},
		actions: {
			nuxtServerInit() {
				if (process.browser) {
					const store = JSON.parse(localStorage.getItem('storeStorage'));
					if (!!store.authModule.jwt) {
						this.$axios.setToken(store.authModule.jwt, 'Bearer');
					}
				}
			}
		}
	});
};

export default store;
