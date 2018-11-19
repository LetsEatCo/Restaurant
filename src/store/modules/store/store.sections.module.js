import Vue from 'vue';
import {
	STORE_GET_SECTIONS_REQUEST,
	STORE_CREATE_SECTION_REQUEST,
	STORE_CREATE_SECTION_REQUEST_SUCCESS,
	STORE_CREATE_SECTION_REQUEST_ERROR,
	STORE_GET_SECTIONS_REQUEST_SUCCESS,
	STORE_GET_SECTIONS_REQUEST_ERROR,
	STORE_GET_SECTION_REQUEST,
	STORE_GET_SECTION_REQUEST_SUCCESS,
	STORE_GET_SECTION_REQUEST_ERROR,
	STORE_DELETE_SECTION_REQUEST,
	STORE_DELETE_SECTION_REQUEST_SUCCESS,
	STORE_DELETE_SECTION_REQUEST_ERROR,
	STORE_UPDATE_SECTION_REQUEST,
	STORE_UPDATE_SECTION_REQUEST_SUCCESS,
	STORE_UPDATE_SECTION_REQUEST_ERROR

} from "../../actions/store/store.sections.actions";


const state = {
	status: '',
	sections: [],
};

const getters = {
	getSections: state => state.sections
};

const actions = {

	[STORE_CREATE_SECTION_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_SECTION_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post('/stores/me/sections', data)
				.then(res => {
					commit(STORE_CREATE_SECTION_REQUEST_SUCCESS);
					dispatch(STORE_CREATE_SECTION_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_CREATE_SECTION_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_SECTIONS_REQUEST] : function({commit}){

		commit(STORE_GET_SECTIONS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('/stores/me/sections')
				.then(res => {
					commit(STORE_GET_SECTIONS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_SECTIONS_REQUEST_ERROR);
					reject(err);
				});
		});
	},

};

const mutations = {
	[STORE_CREATE_SECTION_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_CREATE_SECTION_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_CREATE_SECTION_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_SECTIONS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_SECTIONS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'sections', res.data);
	},
	[STORE_GET_SECTIONS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_GET_SECTION_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_SECTION_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_GET_SECTION_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_DELETE_SECTION_REQUEST]: (state) => {
		state.status = 'deleting';
	},
	[STORE_DELETE_SECTION_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_DELETE_SECTION_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_UPDATE_SECTION_REQUEST]: (state) => {
		state.status = 'updating';
	},
	[STORE_UPDATE_SECTION_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_UPDATE_SECTION_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	}
};


export const storeSectionsModule = {
	state,
	getters,
	actions,
	mutations
};
