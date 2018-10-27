<template>
	<div class="app-wrapper">
		<Sidebar class="sidebar-container"/>
		<el-container>
			<el-col :span="24" class="main-container">
				<no-ssr>
					<nuxt/>
				</no-ssr>
			</el-col>
		</el-container>
	</div>
</template>

<script>
	import {Sidebar} from './components';

	export default {
		name: 'Layout',
		components: {
			Sidebar
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.el-container {
		padding: 0 3%;
		height: 100vh;
		overflow: scroll;
	}
</style>
