import Vue from 'vue';
import {
	STORE_PROFILE_REQUEST,
	STORE_PROFILE_REQUEST_ERROR,
	STORE_PROFILE_REQUEST_SUCCESS,
	STORE_ADD_PROFILE_PICTURE_REQUEST,
	STORE_ADD_PROFILE_PICTURE_REQUEST_SUCCESS,
	STORE_ADD_PROFILE_PICTURE_REQUEST_ERROR,
	STORE_EDIT_PROFILE_REQUEST, STORE_EDIT_PROFILE_REQUEST_SUCCESS, STORE_EDIT_PROFILE_REQUEST_ERROR
} from '../../actions/store/store.actions';
import * as Cookies from 'js-cookie'

const state = {
	status: '',
	jwt: '',
	profile: {}};

const getters = {
	isAuthenticated: state => !!Cookies.get('JWT'),
	getProfile: state => state.profile,
	getToken: state => state.jwt,
	isProfileLoaded: state => !!state.profile.name
};

const actions = {
	[STORE_PROFILE_REQUEST]: function ({commit}, jwt) {
		commit(STORE_PROFILE_REQUEST, jwt);
		this.$axios.$get('/stores/me')
			.then(res => {
				commit(STORE_PROFILE_REQUEST_SUCCESS, res);
				this.$router.push('/dashboard');
			})
			.catch(() => {
				commit(STORE_PROFILE_REQUEST_ERROR);
			});
	},[STORE_ADD_PROFILE_PICTURE_REQUEST]: function ({commit},file) {
		commit(STORE_ADD_PROFILE_PICTURE_REQUEST);

		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post(`/stores/me/picture`, file)
				.then(res => {
					commit(STORE_ADD_PROFILE_PICTURE_REQUEST_SUCCESS);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_ADD_PROFILE_PICTURE_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_EDIT_PROFILE_REQUEST]: function({commit}, data){

		commit(STORE_EDIT_PROFILE_REQUEST);
		this.$axios.$patch('/stores/me', data)
			.then(res => {
				commit(STORE_EDIT_PROFILE_REQUEST_SUCCESS, res);
			})
			.catch(() => {
				commit(STORE_EDIT_PROFILE_REQUEST_ERROR);
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
	[STORE_EDIT_PROFILE_REQUEST]: state => {
		state.status = 'loading';
		Vue.set(state);
	},
	[STORE_EDIT_PROFILE_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, res.data);
	},
	[STORE_EDIT_PROFILE_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_ADD_PROFILE_PICTURE_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_ADD_PROFILE_PICTURE_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_ADD_PROFILE_PICTURE_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
};

export const storeModule = {
	state,
	getters,
	actions,
	mutations
};
