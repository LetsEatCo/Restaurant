<template>
		<el-col :span="3">
			<el-scrollbar wrap-class="scrollbar-wrapper">
				<el-menu
					:show-timeout="200"
					:default-active="$route.path"
					mode="vertical"
					background-color="#304156"
					text-color="#bfcbd9"
					active-text-color="#409EFF"
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
		background-color: rgb(238, 241, 246);
		display: inline-block;
	}
</style>

<script>
	import {mapGetters} from 'vuex';
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
