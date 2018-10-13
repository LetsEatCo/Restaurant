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
			async nuxtServerInit({commit},{req, app}) {
				if (process.server) {
					const cookies = app.$cookies.get('store');
					if (!!cookies && !!cookies.authModule.jwt) {
						app.$axios.setToken(cookies.authModule.jwt, 'Bearer');
					}
				}
			}
		}
	});
};

export default store;
