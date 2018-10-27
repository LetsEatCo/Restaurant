export default {
	head: {
		link: [
			{ rel: 'stylesheet', href: 'https://s3.eu-west-3.amazonaws.com/lets-eat-co/fonts/fonts.css' }
		]
	},
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'modern-normalize'
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
