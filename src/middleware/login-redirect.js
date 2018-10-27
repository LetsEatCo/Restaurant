export default function ({store, redirect, route, app}) {
	const cookies = app.$cookies.get('rootpersist');
	if (process.server && route.name) {
		if (route.name === 'dashboard-login' && cookies && cookies.storeModule.jwt) {
			return redirect('/dashboard');
		}
		if (route.name.includes('dashboard') && !cookies) {
			return redirect('/login');
		}
	}
}
