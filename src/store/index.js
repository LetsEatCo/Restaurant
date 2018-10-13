import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth.module';
import storeModule from './modules/store.module';
import registerModule from './modules/register.module';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		modules: {
			authModule,
			storeModule,
			registerModule
		},
		actions: {
			async nuxtServerInit({commit},{req, app}) {
				if (process.server) {
					const cookies = app.$cookies.get('store');
					if (cookies && cookies.storeModule.jwt) {
						app.$axios.setToken(cookies.storeModule.jwt, 'Bearer');
					}
				}
			}
		}
	});
};

export default store;
