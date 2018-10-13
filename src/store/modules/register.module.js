import {REGISTER_REQUEST, REGISTER_REQUEST_ERROR, REGISTER_REQUEST_SUCCESS} from '../actions/register.actions';
import {STORE_PROFILE_REQUEST} from '../actions/store/store.actions';

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
			this.$axios.$post('http://localhost/stores/register', data)
				.then(res => {
					this.$axios.setToken(res.data.jwt, 'Bearer');
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
