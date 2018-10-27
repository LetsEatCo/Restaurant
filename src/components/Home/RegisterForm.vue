<template>
	<div>
		<h1>Become a partner</h1>
		<el-form ref="form" :model="form" :rules="rules">
			<el-form-item class="name-field" prop="name">
				<el-input placeholder="Name" v-model="form.name" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="email-field" prop="email">
				<el-input placeholder="Email" type="email" v-model="form.email" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="phone-field" prop="phoneNumber">
				<el-input placeholder="Phone Number" v-model="form.phoneNumber" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="password-field" prop="password">
				<el-input placeholder="Password" type="password" v-model="form.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item class="street-field" prop="street">
				<el-input placeholder="Street" v-model="form.street" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="city-field" prop="city">
				<el-input placeholder="City" v-model="form.city" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="zip-code-field" prop="zipCode">
				<el-input placeholder="Zip code" v-model="form.zipCode" autocomplete="on"></el-input>
			</el-form-item>
			<el-form-item class="country-field" prop="country">
				<el-input placeholder="Country" v-model="form.country" autocomplete="off"></el-input>
			</el-form-item>
			<el-button @click="register('form')">Register</el-button>
		</el-form>
	</div>
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

<style lang="scss" scoped>
	h1 {
		font-size: 28px;
		font-weight: 400;
	}

	.el-input /deep/ .el-input__inner {
		border-radius: 0;
		&:focus {
			border-color: black;
		}
	}

	.el-button {
		margin-top: 10px;
		width: 100%;
		text-align: left;
		text-transform: uppercase;
		background-color: black;
		color: white;
		border: none;
		border-radius: 0;
		padding: 16px 20px;
	}
</style>
