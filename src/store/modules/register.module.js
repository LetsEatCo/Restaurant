import {REGISTER_REQUEST, REGISTER_REQUEST_ERROR, REGISTER_REQUEST_SUCCESS} from '../actions/register.actions';
import {STORE_PROFILE_REQUEST} from '../actions/store/store.actions';
import * as Cookies from 'js-cookie'

const state = {
	status: ''
};

const getters = {
	registerStatus: state => state.status
};

const actions = {
	[REGISTER_REQUEST]: function ({commit, dispatch}, data) {
		return new Promise((resolve, reject) => {
			commit(REGISTER_REQUEST);
			this.$axios.$post('/stores/register', data)
				.then(res => {
					this.$axios.setToken(res.data.jwt, 'Bearer');
					Cookies.set('JWT', res.data.jwt, { expires: 7 });
					commit(REGISTER_REQUEST_SUCCESS);
					dispatch(STORE_PROFILE_REQUEST, res.data.jwt);
					resolve(res);
				})
				.catch(err => {
					commit(REGISTER_REQUEST_ERROR, err);
					reject(err);
				});
		});
	}
};

const mutations = {
	[REGISTER_REQUEST]: state => {
		state.status = 'loading';
	},
	[REGISTER_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[REGISTER_REQUEST_ERROR]: state => {
		state.status = 'error';
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
