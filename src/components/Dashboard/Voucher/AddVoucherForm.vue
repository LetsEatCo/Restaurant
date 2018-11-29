<template>
  <el-dialog
    title="Add Voucher"
    custom-class="Actions__add-dialog"
    :visible.sync="formVisible"
    top="30vh"
    width="35%"
    @close="closeForm()"
  >
    <el-form
      ref="form"
      :model="form"
    >
      <el-form-item label="Voucher Code">
        <el-input
          placeholder="BLACKFRIDAY5"
          v-model="form.code"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="Voucher Reduction">
        <el-input
          placeholder="4"
          v-model="form.reduction"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="Voucher Expiration Date">
        <el-date-picker
          v-model="form.expirationDate"
          type="date"
          placeholder="Pick a day"
        />
      </el-form-item>

      <el-form-item label="Description">
        <el-input
          placeholder="5€ on your meal with BLACKFRIDAY5 code"
          v-model="form.description"
          autocomplete="off"
        />
      </el-form-item>

    </el-form>
    <div slot="footer">
      <el-button
        class="cancel-button"
        @click="formVisible = false"
      >Cancel
      </el-button>
      <el-button
        class="add-button"
        @click="addVoucher"
      >Add Voucher</el-button>
    </div>
  </el-dialog>
</template>

<script>
	import {STORE_CREATE_VOUCHER_REQUEST} from '../../../store/actions/store/store.vouchers.actions';
	import eventBus from '../../../utils/event-bus';

	export default {
		name: 'AddVoucherForm',
		props: {
			isFormVisible: Boolean
		},
		data() {
			return {
				formVisible: this.showForm() || false,
				form: {
					code: '',
					reduction: 0,
					expirationDate: '',
					description: '',
				}
			};
		},
		methods: {
			showForm() {
				eventBus.$on('addVoucherFormVisible', payload => {
					this.formVisible = payload;
				});
			},
			closeForm() {
				this.formVisible
					? eventBus.$emit('addVoucherFormVisible', false)
					: eventBus.$emit('addVoucherFormVisible', true);
				this.formVisible = false;
			},
			sleep(seconds){
			const waitUntil = new Date().getTime() + seconds*1000;
			while(new Date().getTime() < waitUntil) true;
		},
			addVoucher() {
				const data = {
					code: this.form.code,
					reduction: parseInt(this.form.reduction),
					expirationDate: this.form.expirationDate,
					description: this.form.description
				};

				this.form.code = '';
				this.form.reduction = 0;
				this.form.expirationDate = '';
				this.form.description = '';
				this.$store.dispatch(STORE_CREATE_VOUCHER_REQUEST, data);
				this.sleep(1);
				return this.closeForm();
			}
		}
	};
</script>

