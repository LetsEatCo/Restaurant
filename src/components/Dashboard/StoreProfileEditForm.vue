<template>
  <div class="edit-infos-container">
    <h1>Edit your Store: </h1>
    <el-form 
      ref="form" 
      :model="form" 
      label-width="120px"
    >
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item><el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item><el-form-item label="Phone number">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item 
        label="Street" 
        class="street-field" 
        prop="street"
      >
        <el-input 
          v-model="form.street" 
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item 
        label="City" 
        class="city-field" 
        prop="city"
      >
        <el-input 
          v-model="form.city" 
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item 
        label="Zip code" 
        class="zip-code-field" 
        prop="zipCode"
      >
        <el-input 
          v-model="form.zipCode" 
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item 
        label="Country" 
        class="country-field" 
        prop="country"
      >
        <el-input 
          v-model="form.country" 
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="updateProfile"
        >Update</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
	import {STORE_EDIT_PROFILE_REQUEST} from "../../store/actions/store/store.actions";
	export default {
		name: 'StoreProfileEditForm',
		data() {
			return {
				form: {
					name: this.$store.getters.getProfile.name,
					email: this.$store.getters.getProfile.email,
					phoneNumber:this.$store.getters.getProfile.phoneNumber,
					street: this.$store.getters.getProfile.address.street,
					city: this.$store.getters.getProfile.address.city,
					zipCode: this.$store.getters.getProfile.address.zipCode,
					country: this.$store.getters.getProfile.address.country,
				}
			}
		},
		methods: {
			updateProfile() {
				const data = {
					name: this.form.name,
					email: this.form.email,
					phoneNumber: this.form.phoneNumber,
					address: {
						street: this.form.street,
						city: this.form.city,
						zipCode: this.form.zipCode,
						country: this.form.country
					}
				};
				return this.$store.dispatch(STORE_EDIT_PROFILE_REQUEST, data);
			}
		}
	}
</script>

<style scoped>

</style>
