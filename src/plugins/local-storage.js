import createPersistedState from 'vuex-persistedstate';

export default function ({store, isHMR}) {
	if (isHMR) {
		return;
	}
	if (process.client) {

		createPersistedState({
			key: 'storeStorage',
			paths: [
				'authModule.jwt',
				'storeModule.profile'
			]
		})(store);
	}
}
