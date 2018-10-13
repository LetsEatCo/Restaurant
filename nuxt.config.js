export default {
	css: [
		'element-ui/lib/theme-chalk/reset.css',
		'element-ui/lib/theme-chalk/index.css'
	],
	srcDir: 'src/',
	plugins: [
		'@/plugins/element-ui',
		'@/plugins/cookies-state'
	],
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
		'cookie-universal-nuxt'
	],
	loading: {
		color: '#2CC485',
		height: '5px'
	}
};
