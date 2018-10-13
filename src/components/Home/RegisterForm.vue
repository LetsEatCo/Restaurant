<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="120px">
		<el-form-item label="Name" class="store-field" prop="name">
			<el-input v-model="form.name" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Email" class="email-field" prop="email">
			<el-input type="email" v-model="form.email" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Phone Number" class="phone-field" prop="phoneNumber">
			<el-input v-model="form.phoneNumber" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Password" class="password-field" prop="password">
			<el-input type="password" v-model="form.password" autocomplete="off"></el-input>
		</el-form-item>
		<el-button @click="register('form')">Register</el-button>
	</el-form>
</template>

<script>
	import {REGISTER_REQUEST} from '../../store/actions/register.actions';

	export default {
		name: 'RegisterForm',
		data() {
			return {
				form: {
					name: '',
					email: '',
					phoneNumber: '',
					password: ''
				},
				rules: {
					name: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'},
					],
					email: [
						{required: true, message: 'Please, enter an email', trigger: 'blur'},
						{type: 'email', message: 'Email is not valid', trigger: 'blur'},
					],
					phoneNumber: [
						{required: true, message: 'Please, enter a phone number', trigger: 'blur'},
						{min: 10, message: 'Phone number should be longer than 10', trigger: 'blur'},
						{type: 'integer', message: 'No letters in phone number field', trigger: 'blur'}
					],
					password: [
						{required: true, message: 'Please, enter a password', trigger: 'blur'},
					],
				}
			};
		},
		methods: {
			async register(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						const informations = {
							name: this.form.name,
							email: this.form.email,
							phoneNumber: parseInt(this.form.phoneNumber),
							password: this.form.password
						};
						return this.$store.dispatch(REGISTER_REQUEST, informations);
					} else {
						return false;
					}
				});
			}
		}
	};
</script>

<style scoped>

</style>
