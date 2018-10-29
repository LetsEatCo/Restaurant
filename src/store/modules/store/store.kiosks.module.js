import Vue from 'vue';
import {
	STORE_CREATE_KIOSK_REQUEST,
	STORE_CREATE_KIOSK_REQUEST_ERROR,
	STORE_CREATE_KIOSK_REQUEST_SUCCESS,
	STORE_GET_KIOSKS_REQUEST,
	STORE_GET_KIOSKS_REQUEST_ERROR,
	STORE_GET_KIOSKS_REQUEST_SUCCESS
} from '../../actions/store/store.kiosks.actions';

const state = {
	status: '',
	kiosks: {}
};

const getters = {
	getKiosks: state => state.kiosks || {}
};

const actions = {
	[STORE_CREATE_KIOSK_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_KIOSK_REQUEST);
		this.$axios.setToken(JSON.parse(localStorage.getItem('store:persist')).storeModule.jwt, 'Bearer');
		this.$axios.$post('/stores/me/kiosks', data)
			.then(res => {
				commit(STORE_CREATE_KIOSK_REQUEST_SUCCESS, res);
			})
			.catch(err => {
				commit(STORE_CREATE_KIOSK_REQUEST_ERROR);
			});
	},
	// [STORE_GET_KIOSKS_REQUEST]: function ({commit}) {
	// 	commit(STORE_GET_KIOSKS_REQUEST);
	// 	this.$axios.$get('http://localhost/stores/me/kiosks')
	// 		.then(res => {
	// 			commit(STORE_GET_KIOSKS_REQUEST_SUCCESS, res);
	// 		})
	// 		.catch(err => {
	// 			commit(STORE_GET_KIOSKS_REQUEST_ERROR);
	// 		});
	// }
};

const mutations = {
	[STORE_CREATE_KIOSK_REQUEST]: (state, jwt) => {
		state.status = 'loading';
	},
	[STORE_CREATE_KIOSK_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'profile', res.data);
	},
	[STORE_CREATE_KIOSK_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_KIOSKS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_KIOSKS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'kiosks', res.data);
	}
};

export const storeKiosksModule = {
	state,
	getters,
	actions,
	mutations
};
