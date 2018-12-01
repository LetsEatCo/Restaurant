import Vue from 'vue';
import {
	STORE_CREATE_VOUCHER_REQUEST,
	STORE_CREATE_VOUCHER_REQUEST_SUCCESS,
	STORE_CREATE_VOUCHER_REQUEST_ERROR,
	STORE_GET_VOUCHERS_REQUEST,
	STORE_GET_VOUCHERS_REQUEST_ERROR,
	STORE_GET_VOUCHERS_REQUEST_SUCCESS,
	STORE_DELETE_VOUCHER_REQUEST,
	STORE_DELETE_VOUCHER_REQUEST_ERROR,
	STORE_DELETE_VOUCHER_REQUEST_SUCCESS,
} from "../../actions/store/store.vouchers.actions";


const state = {
	status: '',
	vouchers: ''
};

const getters = {
	getVouchers: state => state.vouchers,
	getVoucherByUuid: (state) => uuid => state.vouchers.find(voucher => voucher.uuid === uuid)
};

const actions = {

	[STORE_CREATE_VOUCHER_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_VOUCHER_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post('/stores/me/vouchers', data)
				.then(res => {
					commit(STORE_CREATE_VOUCHER_REQUEST_SUCCESS);
					dispatch(STORE_GET_VOUCHERS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_CREATE_VOUCHER_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_VOUCHERS_REQUEST]: function ({commit}) {
		commit(STORE_GET_VOUCHERS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('/stores/me/vouchers')
				.then(res => {
					commit(STORE_GET_VOUCHERS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_VOUCHERS_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_DELETE_VOUCHER_REQUEST]: function ({commit, dispatch}, uuid) {
		commit(STORE_DELETE_VOUCHER_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$delete(`/stores/me/vouchers/${uuid}`)
				.then(res => {
					commit(STORE_DELETE_VOUCHER_REQUEST_SUCCESS);
					dispatch(STORE_GET_VOUCHERS_REQUEST);
					resolve(res);
				}).catch(err => {
				commit(STORE_DELETE_VOUCHER_REQUEST_ERROR);
				reject(err);
			});
		});
	},
};

const mutations = {
	[STORE_CREATE_VOUCHER_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_CREATE_VOUCHER_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_CREATE_VOUCHER_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_VOUCHERS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_VOUCHERS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'vouchers', res.data);
	},
	[STORE_GET_VOUCHERS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_DELETE_VOUCHER_REQUEST]: (state) => {
		state.status = 'deleting';
	},
	[STORE_DELETE_VOUCHER_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_DELETE_VOUCHER_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
};

export const storeVouchersModule = {
	state,
	getters,
	actions,
	mutations
};
