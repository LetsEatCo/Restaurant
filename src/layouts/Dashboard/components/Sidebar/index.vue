<template>
	<el-col :span="3">
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:show-timeout="200"
				:default-active="$route.path"
				mode="vertical"
				text-color="#000"
				active-text-color="#000"
			>
				<el-aside class="sidebar" width="100%">
					<el-menu>
						<SidebarItem v-for="item in nav" :key="item.name" :item="item" :url="item.url"/>
					</el-menu>
				</el-aside>
			</el-menu>
		</el-scrollbar>
	</el-col>
</template>

<style scoped lang="scss">
	.sidebar {
		height: 100vh;
		background-color: #FFF;
		display: inline-block;
	}

	.el-menu {
		border: none;
	}

	.el-col {
		box-shadow: 0 16px 38px -12px rgba(0, 0, 0, .56), 0 4px 25px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);
	}
</style>

<script>
	import SidebarItem from './SidebarItem';
	import nav from '../../menu';

	export default {
		components: {SidebarItem},
		data() {
			return {
				nav: nav.items
			};
		}
	};
</script>
