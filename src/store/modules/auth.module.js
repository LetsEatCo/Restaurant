import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth.actions';
import * as Cookies from 'js-cookie';
import {STORE_PROFILE_REQUEST} from '../actions/store/store.actions';

const state = {
	status: ''
};
const getters = {
	authStatus: state => state.status
};

const actions = {
	[AUTH_REQUEST]: function ({commit, dispatch}, credentials) {
		return new Promise((resolve, reject) => {
			commit(AUTH_REQUEST);
			this.$axios.$post('http://localhost/stores/login', credentials)
				.then(res => {
					this.$axios.setToken(res.data.jwt, 'Bearer');
					commit(AUTH_SUCCESS);
					dispatch(STORE_PROFILE_REQUEST, res.data.jwt);
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
	[AUTH_SUCCESS]: (state) => {
		state.status = 'success';
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
