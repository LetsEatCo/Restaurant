export default ({store, $axios}) => {
		$axios.setToken(store.state.Store.jwt)
}
