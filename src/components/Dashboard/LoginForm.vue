<template>
	<el-form ref="form" :model="form" label-width="120px">
		<el-form-item label="Email" class="email-field">
			<el-input type="email" v-model="form.email" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Password" class="password-field">
			<el-input type="password" v-model="form.password" autocomplete="off"></el-input>
		</el-form-item>
		<el-button @click="login">Login</el-button>
	</el-form>
</template>

<style lang="scss">
	.el-form {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 120px;
	}

	.el-input {
		max-width: 360px;
	}

	.el-button {
		margin-left: 120px;
		width: 360px;
	}

	.password-field {
		margin-bottom: 44px;
	}
</style>

<script>
	import {AUTH_REQUEST} from '../../store/actions/auth.actions';

	export default {
		name: 'LoginForm',
		data() {
			return {
				form: {
					email: '',
					password: ''
				}
			};
		},
		methods: {
			async login() {
				const credentials = {
					email: this.form.email,
					password: this.form.password
				};
				return this.$store.dispatch(AUTH_REQUEST, credentials);
			}
		}
	};
</script>
