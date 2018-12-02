<template>
  <el-dialog
    title="Upload Meal Image"
    custom-class="Actions__edit-dialog"
    :visible.sync="formVisible"
    top="10vh"
    width="35%"
    @close="closeForm()"
  >
    <el-form
      label-position="top"
      ref="form"
      :model="form"
    >
      <input
        type="file"
        @change="onFileSelected"
      >
    </el-form>
    <div slot="footer">
      <el-button
        class="cancel-button"
        @click="closeForm()"
      >Cancel
      </el-button>
      <el-button
        class="add-button"
        @click="uploadProductPicture('form')"
      >Upload Product Picture</el-button>
    </div>
  </el-dialog>
</template>

<script>

	import eventBus from '../../../utils/event-bus';
	import {STORE_ADD_MEAL_PICTURE_REQUEST} from '../../../store/actions/store/store.meals.actions'

	export default {
		name: 'AddMealPicture',
		data() {
			return {
				formVisible: this.showForm() || false,
				form: {
					uuid: '',
				},
				selectedFile: null

			};
		},
		methods: {

			showForm() {
				eventBus.$on('AddMealPictureFormVisible', payload => {

					this.form.uuid = payload.data.uuid;
					this.formVisible = payload.visible;
				});
			},sleep(seconds){
				const waitUntil = new Date().getTime() + seconds*1000;
				while(new Date().getTime() < waitUntil) true;
			},
			closeForm() {
				this.formVisible = false;
			},
			onFileSelected(event){
				if(event.target.files[0]){
					this.selectedFile = event.target.files[0];
				}
			},
			async uploadProductPicture(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {

						const uuid = this.form.uuid;
						const fileToUpload = new FormData();
						fileToUpload.append('file', this.selectedFile);
						const data = {
							uuid,
							file: fileToUpload
						};
						this.$store.dispatch(STORE_ADD_MEAL_PICTURE_REQUEST, data);
						this.sleep(1);
						this.closeForm();

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
