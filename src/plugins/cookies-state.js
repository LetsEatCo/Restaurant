import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie'

export default function ({store}) {
		createPersistedState({
			key: 'store',
			storage: {
				getItem: key => Cookies.get(key),
				setItem: (key, value) => Cookies.set(key, value),
				removeItem: key => Cookies.remove(key)
			},
			paths: [
				'storeModule.jwt',
				'storeModule.profile'
			]
		})(store);
}
