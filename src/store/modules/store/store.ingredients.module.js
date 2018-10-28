import Vue from 'vue';
import {
	STORE_CREATE_INGREDIENT_REQUEST,
	STORE_CREATE_INGREDIENT_REQUEST_ERROR,
	STORE_CREATE_INGREDIENT_REQUEST_SUCCESS,
	STORE_GET_INGREDIENTS_REQUEST,
	STORE_GET_INGREDIENTS_REQUEST_ERROR,
	STORE_GET_INGREDIENTS_REQUEST_SUCCESS
} from '../../actions/store/store.ingredients.actions';

const state = {
	status: '',
	ingredients: ''
};

const getters = {
	getIngredients: state => state.ingredients
};

const actions = {
	[STORE_CREATE_INGREDIENT_REQUEST]: function ({commit, dispatch}, data) {
		commit(STORE_CREATE_INGREDIENT_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.app.store.getters.getToken, 'Bearer');
			this.$axios.$post('http://localhost/stores/me/ingredients', data)
				.then(res => {
					commit(STORE_CREATE_INGREDIENT_REQUEST_SUCCESS);
					dispatch(STORE_GET_INGREDIENTS_REQUEST);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_CREATE_INGREDIENT_REQUEST_ERROR);
					reject(err);
				});
		});
	},
	[STORE_GET_INGREDIENTS_REQUEST]: function ({commit}) {
		commit(STORE_GET_INGREDIENTS_REQUEST);
		return new Promise((resolve, reject) => {
			this.$axios.setToken(this.$cookies.get('rootpersist').Store.jwt
				|| this.app.store.getters.getToken, 'Bearer');
			this.$axios.$get('http://localhost/stores/me/ingredients')
				.then(res => {
					commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, res);
					resolve(res);
				})
				.catch(err => {
					commit(STORE_GET_INGREDIENTS_REQUEST_ERROR);
					reject(err);
				});
		});
	}
};

const mutations = {
	[STORE_CREATE_INGREDIENT_REQUEST]: (state, jwt) => {
		state.status = 'loading';
	},
	[STORE_CREATE_INGREDIENT_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
	},
	[STORE_CREATE_INGREDIENT_REQUEST_ERROR]: state => {
		state.status = 'error';
	},
	[STORE_GET_INGREDIENTS_REQUEST]: (state) => {
		state.status = 'loading';
	},
	[STORE_GET_INGREDIENTS_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'ingredients', res.data);
	},
	[STORE_GET_INGREDIENTS_REQUEST_ERROR]: (state) => {
		state.status = 'error';
	}
};

export const storeIngredientsModule = {
	state,
	getters,
	actions,
	mutations
};
