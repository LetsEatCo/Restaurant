<template>
	<div>
		<StoreProfile/>
	</div>
</template>

<script>

	import StoreProfile from '../../../components/Dashboard/StoreProfile';

	export default {
		name: 'profile',
		layout: 'Dashboard/DashboardLayout',
		components: {StoreProfile}
	};
</script>

<style scoped>

</style>
