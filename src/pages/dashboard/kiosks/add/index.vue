<template>
  <el-container>
    <el-main>
      <AddKioskForm />
    </el-main>
  </el-container>
</template>

<script>

	import AddKioskForm from '../../../../components/Dashboard/AddKioskForm';
	export default {
		layout: 'Dashboard/DashboardLayout',
		components: {AddKioskForm},
	}
</script>
