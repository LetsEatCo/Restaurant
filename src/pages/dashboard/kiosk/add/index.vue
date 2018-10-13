<template>
	<el-container>
		<el-main>
			<AddKioskForm/>
		</el-main>
	</el-container>
</template>

<script>

	import AddKioskForm from '../../../../components/Dashboard/AddKioskForm';
	export default {
		components: {AddKioskForm},
		middleware: 'is-logged',
	}
</script>

<style scoped>

</style>
