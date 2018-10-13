import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth.module';
import registerModule from './modules/register.module';
import {storeModule, storeKioksModule} from './modules/store';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		modules: {
			authModule,
			registerModule,
			storeModule,
			storeKioksModule
		},
		actions: {
			async nuxtServerInit({commit},{req, app}) {
				if (process.server) {
					const cookies = app.$cookies.get('store');
					if (cookies && cookies.storeModule.jwt) {
						await app.$axios.setToken(cookies.storeModule.jwt, 'Bearer');
					}
				}
			}
		}
	});
};

export default store;
