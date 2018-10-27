import Vue from 'vue';
import Vuex from 'vuex';
import {default as Auth} from './modules/auth.module';
import {default as Register} from './modules/register.module';
import {storeModule as Store,
	storeKiosksModule as StoreKiosks,
	storeIngredientsModule as StoreIngredients} from './modules/store';

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
	});
};

export default store;
