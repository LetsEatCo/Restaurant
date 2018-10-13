export default function ({store, redirect, app}) {
	const cookies = app.$cookies.get('store');
	if (!!cookies && !!cookies.authModule.jwt) {
			return redirect('/dashboard')
		}
}
