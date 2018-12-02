<template>
  <div class="infos-container">
    <ul>
      <li>Name : {{ getProfile.name }}</li>
      <li>Email : {{ getProfile.email }}</li>
      <li>Phone-number : {{ getProfile.phoneNumber }}</li>
    </ul>



    <el-form
      label-position="top"
      ref="form"
      :model="form"
    >
      <input
        type="file"
        @change="onFileSelected"
      >
      <el-button
        class="add-button"
        @click="uploadProfilePicture('form')"
      >Upload Profile Picture</el-button>
    </el-form>

  </div>
</template>

<script>

	import { STORE_ADD_PROFILE_PICTURE_REQUEST }from '../../store/actions/store/store.actions';
	export default {

		name: 'StoreProfile',
		computed: {

			getProfile() {
				return this.$store.getters.getProfile;
			}
		},
		methods: {
			onFileSelected(event){
				if(event.target.files[0]){
					this.selectedFile = event.target.files[0];
				}
			},sleep(seconds){
				const waitUntil = new Date().getTime() + seconds*1000;
				while(new Date().getTime() < waitUntil) true;
			},
			async uploadProfilePicture() {

				const fileToUpload = new FormData();
				fileToUpload.append('file', this.selectedFile);

				this.$store.dispatch(STORE_ADD_PROFILE_PICTURE_REQUEST, fileToUpload);

				this.sleep(1);
				this.closeForm();
			}
		}
	};
</script>

<style scoped>

</style>
