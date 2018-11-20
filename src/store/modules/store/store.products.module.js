import Vue from 'vue';
import {
	STORE_CREATE_PRODUCT_REQUEST,
	STORE_CREATE_PRODUCT_REQUEST_ERROR,
	STORE_CREATE_PRODUCT_REQUEST_SUCCESS,
	STORE_DELETE_PRODUCT_REQUEST,
	STORE_DELETE_PRODUCT_REQUEST_SUCCESS,
	STORE_GET_PRODUCTS_REQUEST,
	STORE_DELETE_PRODUCT_REQUEST_ERROR,
	STORE_GET_PRODUCTS_REQUEST_ERROR,
	STORE_GET_PRODUCTS_REQUEST_SUCCESS,
	STORE_UPDATE_PRODUCT_REQUEST,
	STORE_UPDATE_PRODUCT_REQUEST_SUCCESS,
	STORE_UPDATE_PRODUCT_REQUEST_ERROR
} from '../../actions/store/store.products.actions';

const state = {
	status: '',
	products: []
};

const getters = {
	getProducts: state => state.products,
	getProductByUuid: (state) => uuid => state.products.find(product => product.uuid === uuid)
};

const actions = {
	[STORE_CREATE_PRODUCT_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_PRODUCT_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post('/stores/me/products', data)
				.then(res => {
					commit(STORE_CREATE_PRODUCT_REQUEST_SUCCESS);
					dispatch(STORE_GET_PRODUCTS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_CREATE_PRODUCT_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_PRODUCTS_REQUEST]: function ({commit}) {
		commit(STORE_GET_PRODUCTS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('/stores/me/products')
				.then(res => {
					commit(STORE_GET_PRODUCTS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_PRODUCTS_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_DELETE_PRODUCT_REQUEST]: function ({commit, dispatch}, uuid) {
		commit(STORE_DELETE_PRODUCT_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$delete(`/stores/me/products/${uuid}`)
				.then(res => {
					commit(STORE_DELETE_PRODUCT_REQUEST_SUCCESS);
					dispatch(STORE_GET_PRODUCTS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_DELETE_PRODUCT_REQUEST_ERROR);
					reject(err);
				});
		});
	},

	[STORE_UPDATE_PRODUCT_REQUEST]: function ({commit, dispatch}, data) {
		const {uuid, ...values} = data;
		commit(STORE_UPDATE_PRODUCT_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$patch(`/stores/me/products/${uuid}`, values)
				.then(res => {
					commit(STORE_UPDATE_PRODUCT_REQUEST_SUCCESS);
					dispatch(STORE_GET_PRODUCTS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_UPDATE_PRODUCT_REQUEST_ERROR);
					reject(err);
				});
		});
	}
};

const mutations = {
	[STORE_CREATE_PRODUCT_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_CREATE_PRODUCT_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_CREATE_PRODUCT_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_PRODUCTS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_PRODUCTS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'products', res.data);
	},
	[STORE_GET_PRODUCTS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_DELETE_PRODUCT_REQUEST]: (state) => {
		state.status = 'deleting';
	},
	[STORE_DELETE_PRODUCT_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_DELETE_PRODUCT_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_UPDATE_PRODUCT_REQUEST]: (state) => {
		state.status = 'updating';
	},
	[STORE_UPDATE_PRODUCT_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_UPDATE_PRODUCT_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	}
};

export const storeProductsModule = {
	state,
	getters,
	actions,
	mutations
};
