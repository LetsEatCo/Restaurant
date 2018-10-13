export default function ({store, redirect, app}) {
	const cookies = app.$cookies.get('store');
	if (cookies && cookies.storeModule.jwt) {
			return redirect('/dashboard')
		}
}
