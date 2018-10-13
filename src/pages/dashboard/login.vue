<template>
	<el-container>
		<el-main>
			<el-row>
				<el-col :span="10" class="login__login-container">
					<LoginForm/>
				</el-col>
				<el-col :span="14" class="login__media-container"></el-col>
			</el-row>
		</el-main>
	</el-container>
</template>
<style lang="scss">
	.el-container {
		height: 100vh;
		width: 100vw;
	}

	.el-col {
		height: 100vh;
	}

	.el-main {
		padding: 0;
	}
</style>

<script>
	import LoginForm from '../../components/Dashboard/LoginForm';

	export default {
		components: {LoginForm},
		middleware: 'login-redirect'
	};
</script>
