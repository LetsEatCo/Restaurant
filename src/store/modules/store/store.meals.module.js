import Vue from 'vue';
import {
	STORE_CREATE_MEAL_REQUEST,
	STORE_CREATE_MEAL_REQUEST_ERROR,
	STORE_CREATE_MEAL_REQUEST_SUCCESS,
	STORE_DELETE_MEAL_REQUEST,
	STORE_DELETE_MEAL_REQUEST_SUCCESS,
	STORE_GET_MEALS_REQUEST,
	STORE_DELETE_MEAL_REQUEST_ERROR,
	STORE_GET_MEALS_REQUEST_ERROR,
	STORE_GET_MEALS_REQUEST_SUCCESS,
	STORE_UPDATE_MEAL_REQUEST,
	STORE_UPDATE_MEAL_REQUEST_SUCCESS,
	STORE_UPDATE_MEAL_REQUEST_ERROR, STORE_GET_MEAL_REQUEST, STORE_GET_MEAL_REQUEST_SUCCESS
} from '../../actions/store/store.meals.actions';

const state = {
	status: '',
	meals: []
};

const getters = {
	getMeals: state => state.meals,
	getMealByUuid: (state) => uuid => state.meals.find(meal => meal.uuid === uuid)
};

const actions = {
	[STORE_CREATE_MEAL_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_MEAL_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post('/stores/me/meals', data)
				.then(res => {
					commit(STORE_CREATE_MEAL_REQUEST_SUCCESS);
					dispatch(STORE_GET_MEALS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_CREATE_MEAL_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_MEALS_REQUEST]: function ({commit}) {
		commit(STORE_GET_MEALS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('/stores/me/meals')
				.then(res => {
					commit(STORE_GET_MEALS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_MEALS_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_MEAL_REQUEST]: function ({commit}, uuid) {
		commit(STORE_GET_MEALS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get(`/stores/me/meals/${uuid}`)
				.then(res => {
					commit(STORE_GET_MEAL_REQUEST_SUCCESS);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_MEALS_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_DELETE_MEAL_REQUEST]: function ({commit, dispatch}, uuid) {
		commit(STORE_DELETE_MEAL_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$delete(`/stores/me/meals/${uuid}`)
				.then(res => {
					commit(STORE_DELETE_MEAL_REQUEST_SUCCESS);
					dispatch(STORE_GET_MEALS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_DELETE_MEAL_REQUEST_ERROR);
					reject(err);
				});
		});
	},

	[STORE_UPDATE_MEAL_REQUEST]: function ({commit, dispatch}, data) {
		const {uuid, ...values} = data;
		commit(STORE_UPDATE_MEAL_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$patch(`/stores/me/meals/${uuid}`, values)
				.then(res => {
					commit(STORE_UPDATE_MEAL_REQUEST_SUCCESS);
					dispatch(STORE_GET_MEALS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_UPDATE_MEAL_REQUEST_ERROR);
					reject(err);
				});
		});
	}
};

const mutations = {
	[STORE_CREATE_MEAL_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_CREATE_MEAL_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_CREATE_MEAL_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_MEALS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_MEALS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'meals', res.data);
	},
	[STORE_GET_MEALS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_GET_MEAL_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_MEAL_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_DELETE_MEAL_REQUEST]: (state) => {
		state.status = 'deleting';
	},
	[STORE_DELETE_MEAL_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_DELETE_MEAL_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	},
	[STORE_UPDATE_MEAL_REQUEST]: (state) => {
		state.status = 'updating';
	},
	[STORE_UPDATE_MEAL_REQUEST_SUCCESS]: (state) => {
		state.status = 'success';
	},
	[STORE_UPDATE_MEAL_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	}
};

export const storeMealsModule = {
	state,
	getters,
	actions,
	mutations
};
