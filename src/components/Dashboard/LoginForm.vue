<template>
  <el-form 
    ref="form" 
    :model="form" 
    :class="$mq"
  >
    <el-form-item class="email-field">
      <el-input 
        placeholder="Email" 
        type="email" 
        v-model="form.email" 
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item class="password-field">
      <el-input 
        placeholder="Password" 
        type="password" 
        v-model="form.password" 
        autocomplete="off"
      />
    </el-form-item>
    <el-button @click="login">Login</el-button>
  </el-form>
</template>

<style lang="scss" scoped>
	.el-form {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 120px;

		&.md {
			padding: 0 40px;
		}
		&.sm {
			padding: 0 20px;
		}
	}

	.el-input {
		/deep/ .el-input__inner {
			border-radius: 0;
			&:focus {
				border-color: black;
			}
		}
	}

	.el-button {
		text-align: left;
		text-transform: uppercase;
		background-color: black;
		color: white;
		border: none;
		border-radius: 0;
		padding: 16px 20px;
		&:hover {
			background-color: black;
			color: white;
			border: none;
		}
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
