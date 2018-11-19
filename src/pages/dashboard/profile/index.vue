<template>
  <div>
    <StoreProfile />
  </div>
</template>

<script>

	import StoreProfile from '../../../components/Dashboard/StoreProfile';

	export default {
		name: 'Profile',
		layout: 'Dashboard/DashboardLayout',
		components: {StoreProfile}
	};
</script>

<style scoped>

</style>
