<template>
  <div class="create-kiosk-container">
    <h1>Create a kiosk : </h1>


    <el-form 
      ref="form" 
      :model="form" 
      label-width="120px"
    >
      <el-form-item 
        label="Serial Number :" 
        prop="serialNumber"
      >
        <el-input v-model="form.serialNumber" />
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="createKiosk"
        >Create</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<style>

	.create-kiosk-container{

		margin-left: 20%;
		width: 50%;
		padding: 4.5rem;
	}


</style>
<script>
	import {STORE_CREATE_KIOSK_REQUEST} from '../../store/actions/store/store.kiosks.actions';

	export default {
		name: 'AddKioskForm',
		data() {
			return {
				form: {
					serialNumber: '',
				}
			}
		},
		methods: {
			createKiosk() {
				const data = {
					serialNumber: this.form.serialNumber
				};
				return this.$store.dispatch(STORE_CREATE_KIOSK_REQUEST, data);
			}
		}
	}
</script>
