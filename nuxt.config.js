export default {
	css: [
		'element-ui/lib/theme-chalk/reset.css',
		'element-ui/lib/theme-chalk/index.css'
	],
	srcDir: 'src/',
	plugins: [
		'@/plugins/element-ui',
		'@/plugins/local-storage'
	],
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],
	mode: 'spa'
};
