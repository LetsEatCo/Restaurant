import Vue from 'vue';
import Vuex from 'vuex';
import {default as Auth} from './modules/auth.module';
import {default as Register} from './modules/register.module';
import {
	storeModule as Store,
	storeKiosksModule as StoreKiosks,
	storeIngredientsModule as StoreIngredients
} from './modules/store';
import auth from '../plugins/auth';
import {STORE_PROFILE_REQUEST} from './actions/store/store.actions';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		modules: {
			Auth,
			Register,
			Store,
			StoreKiosks,
			StoreIngredients
		},
		actions: {
			nuxtServerInit({commit}, {req, isClient, isServer, store, app: {$cookies, $axios}}) {
				const cookies = $cookies.get('rootpersist');
				if (cookies) {
					commit(STORE_PROFILE_REQUEST, cookies.Store.jwt);
					$axios.setToken(cookies.Store.jwt, 'Bearer');
				}
			}
		}
	});
};

export default store;
