export default function ({redirect, route, app}) {
	if (process.server && route.name) {
		const cookies = app.$cookies.get('rootpersist');
		if (route.name === 'dashboard-login' && cookies && cookies.Store.jwt) {
			return redirect('/dashboard');
		}
		if (route.name.includes('dashboard') && !cookies) {
			return redirect('/login');
		}
	}
}
