import Vue from 'vue';
import {
	STORE_PROFILE_REQUEST,
	STORE_PROFILE_REQUEST_ERROR,
	STORE_PROFILE_REQUEST_SUCCESS,
	STORE_EDIT_PROFILE_REQUEST, STORE_EDIT_PROFILE_REQUEST_SUCCESS, STORE_EDIT_PROFILE_REQUEST_ERROR
} from '../../actions/store/store.actions';
import {
	STORE_CREATE_KIOSK_REQUEST_ERROR,
	STORE_CREATE_KIOSK_REQUEST_SUCCESS
} from "../../actions/store/store.kiosks.actions";

const state = {
	status: '',
	jwt: '',
	profile: {}};

const getters = {
	isAuthenticated: state => !!state.jwt,
	getProfile: state => state.profile,
	getToken: state => state.jwt,
	isProfileLoaded: state => !!state.profile.name
};

const actions = {
	[STORE_PROFILE_REQUEST]: function ({commit, dispatch}, jwt) {
		commit(STORE_PROFILE_REQUEST, jwt);
		this.$axios.$get('/stores/me')
			.then(res => {
				commit(STORE_PROFILE_REQUEST_SUCCESS, res);
				this.$router.push('/dashboard');
			})
			.catch(err => {
				commit(STORE_PROFILE_REQUEST_ERROR);
			});
	},
	[STORE_EDIT_PROFILE_REQUEST]: function({commit, dispatch}, data){

		commit(STORE_EDIT_PROFILE_REQUEST);
		this.$axios.$patch('/stores/me', data)
			.then(res => {
				commit(STORE_EDIT_PROFILE_REQUEST_SUCCESS, res);
			})
			.catch(err => {
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
	}
};

export const storeModule = {
	state,
	getters,
	actions,
	mutations
};
