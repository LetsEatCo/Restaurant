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
	});
};

export default store;
