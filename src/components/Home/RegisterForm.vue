<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="120px">
		<el-form-item label="Name" class="name-field" prop="name">
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
		<el-form-item label="Street" class="street-field" prop="street">
			<el-input v-model="form.street" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="City" class="city-field" prop="city">
			<el-input v-model="form.city" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Zip code" class="zip-code-field" prop="zipCode">
			<el-input v-model="form.zipCode" autocomplete="on"></el-input>
		</el-form-item>
		<el-form-item label="Country" class="country-field" prop="country">
			<el-input v-model="form.country" autocomplete="off"></el-input>
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
					password: '',
					street: '',
					city: '',
					zipCode: '',
					country: ''
				},
				rules: {
					name: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'}
					],
					email: [
						{required: true, message: 'Please, enter an email', trigger: 'blur'},
						{type: 'email', message: 'Email is not valid', trigger: 'blur'}
					],
					phoneNumber: [
						{required: true, message: 'Please, enter a phone number', trigger: 'blur'},
						{min: 10, message: 'Phone number should be longer than 10', trigger: 'blur'}
					],
					password: [
						{required: true, message: 'Please, enter a password', trigger: 'blur'}
					],
					street: [
						{required: true, message: 'Please, enter a street name', trigger: 'blur'}
					],
					city: [
						{required: true, message: 'Please, enter a city', trigger: 'blur'}
					],
					zipCode: [
						{required: true, message: 'Please, enter a zipCode', trigger: 'blur'}
					],
					country: [
						{required: true, message: 'Please, enter a country', trigger: 'blur'}
					]
				}
			};
		},
		methods: {
			async register(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						const data = {
							name: this.form.name,
							email: this.form.email,
							phoneNumber: this.form.phoneNumber,
							password: this.form.password,
							address: {
								street: this.form.street,
								city: this.form.city,
								zipCode: this.form.zipCode,
								country: this.form.country
							}
						};
						return this.$store.dispatch(REGISTER_REQUEST, data);
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
