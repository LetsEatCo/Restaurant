import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth.actions';
import {STORE_PROFILE_REQUEST} from '../actions/store.actions';
import * as Cookies from 'js-cookie';

const state = {
	jwt: process.browser ? Cookies.get('JWT') || '' : '',
	status: ''
};
const getters = {
	isAuthenticated: state => !!state.jwt,
	authStatus: state => state.status
};

const actions = {
	[AUTH_REQUEST]: function ({commit, dispatch}, credentials) {
		return new Promise((resolve, reject) => {
			commit(AUTH_REQUEST);
			this.$axios.$post('http://localhost/stores/login', credentials)
				.then(res => {
					this.$axios.setToken(res.data.jwt, 'Bearer');
					commit(AUTH_SUCCESS, res);
					dispatch(STORE_PROFILE_REQUEST);
					this.$router.push('/dashboard');
					resolve(res);
				})
				.catch(err => {
					commit(AUTH_ERROR, err);
					reject(err);
				});
		});
	},
	[AUTH_LOGOUT]: ({commit}) => {
		return new Promise(resolve => {
			commit(AUTH_LOGOUT);
			Cookies.remove('store');
			resolve();
		});
	}
};

const mutations = {
	[AUTH_REQUEST]: state => {
		state.status = 'loading';
	},
	[AUTH_SUCCESS]: (state, res) => {
		state.status = 'success';
		state.jwt = res.data.jwt;
	},
	[AUTH_ERROR]: state => {
		state.status = 'error';
	},
	[AUTH_LOGOUT]: state => {
		state.jwt = '';
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
