import Vue from 'vue';
import Vuex from 'vuex';
import {default as Auth} from './modules/auth.module';
import {default as Register} from './modules/register.module';
import {
	storeModule as Store,
	storeKiosksModule as StoreKiosks,
	storeIngredientsModule as StoreIngredients,
	storeProductsModule as StoreProducts,
	storeMealsModule as StoreMeals,
	storeSectionsModule as StoreSections,
} from './modules/store';
import {STORE_PROFILE_REQUEST} from './actions/store/store.actions';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		modules: {
			Auth,
			Register,
			Store,
			StoreMeals,
			StoreProducts,
			StoreIngredients,
			StoreKiosks,
			StoreSections,
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
