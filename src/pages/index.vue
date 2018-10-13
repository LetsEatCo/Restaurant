<template>
	<el-container>
		<el-main>
			<RegisterForm/>
		</el-main>
	</el-container>

</template>

<style lang="scss">
	.el-header {
		background-color: #b3c0d1;
		color: #333;
		line-height: 60px;
	}
</style>
<script>
	import RegisterForm from '../components/Home/RegisterForm';
	export default {
		components: {RegisterForm}
	};
</script>
