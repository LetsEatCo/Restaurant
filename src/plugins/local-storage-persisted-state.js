import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie'

export default function ({store}) {
		createPersistedState({
			key: 'rootpersist',
			storage: {
				getItem: key => Cookies.get(key),
				setItem: (key, value) => Cookies.set(key, value),
				removeItem: key => Cookies.remove(key)
			},
			paths: [
				'Store.jwt',
			]
		})(store);
	createPersistedState({
		key: 'root:persist',
		paths: [
			'Store.jwt',
			'Store.profile',
			'StoreIngredients.ingredients',
		]
	})(store);
}
