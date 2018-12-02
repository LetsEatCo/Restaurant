import Vue from 'vue';
import {
	STORE_GET_ORDERS_REQUEST,
	STORE_GET_ORDERS_REQUEST_SUCCESS,
	STORE_GET_ORDERS_REQUEST_ERROR
} from '../../actions/store/store.orders.actions';


const state = {
	status: '',
	orders: ''
};

const getters = {
	getOrders: state => state.orders
};

const actions = {

	[STORE_GET_ORDERS_REQUEST]: function ({commit}) {
		commit(STORE_GET_ORDERS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('/stores/me/ORDERs')
				.then(res => {
					commit(STORE_GET_ORDERS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_ORDERS_REQUEST_ERROR);
					reject(err);
				});
		});
	},
};

const mutations = {

	[STORE_GET_ORDERS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_ORDERS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'orders', res.data);
	},
	[STORE_GET_ORDERS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
};

export const storeOrdersModule = {
	state,
	getters,
	actions,
	mutations
};
