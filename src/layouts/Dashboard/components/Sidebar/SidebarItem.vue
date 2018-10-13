<template>
	<div v-if="!item.children">
		<nuxt-link v-if="item.url" :to="'/dashboard'+item.url" append>
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
