<template>
	<div class="edit-profile-container">
		<StoreProfileEditForm/>
	</div>
</template>

<script>
	import StoreProfileEditForm from '../../../../components/Dashboard/StoreProfileEditForm';

	export default {
		layout: 'Dashboard/DashboardLayout',
		components: {StoreProfileEditForm}
	};
</script>

<style scoped>

</style>
