<template>
	<div v-if="!item.children">
		<nuxt-link v-if="item.url && !item.children" :to="'/dashboard'+item.url" append class="Sidebar-Item__link">
			<el-menu-item :index="item.index">
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</nuxt-link>
	</div>
	<div v-else-if="item.children">
		<el-submenu :index="item.index">
			<template slot="title">
				<span slot="title">{{item.name}}</span>
			</template>
			<SidebarItem v-for="child in item.children" :key="child.name" :item="child" :url="child.url"
									 :index="child.index"/>
		</el-submenu>
	</div>
</template>

<script>

	export default {
		name: 'SidebarItem',
		props: {
			item: {
				type: Object,
				required: true
			}
		}
	};
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
	}
	.el-menu-item.is-active {
		color: #000;
		background-color: #dcdcdc;
	}

	.el-menu-item:hover, .el-submenu__title:hover {
		background-color: #dcdcdc;
	}
</style>
