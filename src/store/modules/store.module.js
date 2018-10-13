import Vue from 'vue';
import {AUTH_LOGOUT} from '../actions/auth.actions';
import {
	STORE_PROFILE_REQUEST,
	STORE_PROFILE_REQUEST_ERROR,
	STORE_PROFILE_REQUEST_SUCCESS
} from '../actions/store.actions';

const state = {
	status: '',
	jwt: '',
	profile: {}};

const getters = {
	getProfile: state => state.profile,
	isProfileLoaded: state => !!state.profile.name
};

const actions = {
	[STORE_PROFILE_REQUEST]: function ({commit, dispatch}, jwt) {
		commit(STORE_PROFILE_REQUEST, jwt);
		this.$axios.$get('http://localhost/stores/me')
			.then(res => {
				commit(STORE_PROFILE_REQUEST_SUCCESS, res);
				this.$router.push('/dashboard');
			})
			.catch(err => {
				commit(STORE_PROFILE_REQUEST_ERROR);
				dispatch(AUTH_LOGOUT);
			});
	}
};

const mutations = {
	[STORE_PROFILE_REQUEST]: (state, jwt) => {
		state.status = 'loading';
		Vue.set(state, 'jwt', jwt);
	},
	[STORE_PROFILE_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'profile', res.data);
	},
	[AUTH_LOGOUT]: state => {
		state.profile = {};
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
