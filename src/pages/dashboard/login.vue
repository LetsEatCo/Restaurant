<template>
	<el-container>
		<el-main>
			<el-row>
				<el-col :span="10" class="Login-Form">
					<LoginForm/>
				</el-col>
				<el-col :span="14" class="Login-Media">
					<div class="Login-Media__logo">
						<img src="https://s3.eu-west-3.amazonaws.com/lets-eat-co/assets/Logo--White.svg">
						<p>For Restaurants</p>
					</div>
					<div class="Login-Media__overlay"></div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>
<style lang="scss" scoped>
	.el-container {
		height: 100vh;
		width: 100vw;
	}

	.el-col {
		height: 100vh;
	}

	.el-main {
		padding: 0;
		height: 100vh;
	}

	.Login-Media {
		position: relative;
		background-size: contain;
		display: flex;
		align-items: center;
		justify-content: center;
		background: url("https://s3.eu-west-3.amazonaws.com/lets-eat-co/assets/Restaurants/HeroImage-2.jpg") no-repeat 50% 50%;
		&__overlay {
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.5);
		}
		&__logo {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			img {
				width: 240px;
				border-bottom: 1px solid white;
			}
			p {
				color: white;
				font-size: 28px;
				letter-spacing: 2.5px;
				margin: 30px 0 0 0;
			}
		}
	}
</style>

<script>
	import LoginForm from '../../components/Dashboard/LoginForm';

	export default {
		components: {LoginForm},
		middleware: 'login-redirect'
	};
</script>
