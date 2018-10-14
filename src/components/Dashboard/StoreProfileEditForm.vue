<template>
	<div class="edit-infos-container">

		<h1>Edit your Store: </h1>


		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="Name :" >
				<el-input v-model="form.name">{{getProfile.name}}</el-input>
			</el-form-item><el-form-item label="Email :" >
				<el-input v-model="form.email"></el-input>
			</el-form-item><el-form-item label="Phone number :">
				<el-input v-model="form.phoneNumber"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="editProfil">Create</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	import {STORE_EDIT_PROFILE_REQUEST} from "../../store/actions/store/store.actions";

	export default {
		name: 'StoreProfilEditForm',
		data() {
			return {
				form: {
					name: '',
					email: '',
					phoneNumber: '',
				}
			}
		},
		methods: {
			editProfil() {
				const data = {
					name: this.form.name,
					email: this.form.email,
					phoneNumber: parseInt(this.form.phoneNumber, 10)
				};
				return this.$store.dispatch(STORE_EDIT_PROFILE_REQUEST, data);
			}
		},
		computed: {
			getProfile(){
				return this.$store.getters.getProfile;
			}
		}
	}
</script>

<style scoped>

</style>
