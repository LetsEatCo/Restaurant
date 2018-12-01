<template>
  <div>
    <div class="Title">
      <h1>Vouchers</h1>
    </div>
    <div class="Actions">
      <el-button
        class="Actions__add-button"
        size="medium"
        @click="showAddForm"
      >Add</el-button>
      <AddVoucherForm />
    </div>
    <el-table
      class="Table"
      ref="multipleTable"
      :data="this.getVouchers"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        property="code"
        label="Code"
      />
      <el-table-column
        property="reduction"
        label="Reduction (in €)"
      />
      <el-table-column
        property="description"
        label="Description"
      />
      <el-table-column
        property="expirationDate"
        label="Expiration Date"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteVoucher(scope.$index, getVouchers)"
            class="Table__delete-button"
            size="small"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
	import {
		STORE_GET_VOUCHERS_REQUEST,
		STORE_GET_VOUCHERS_REQUEST_SUCCESS,
		STORE_DELETE_VOUCHER_REQUEST
	} from '../../../store/actions/store/store.vouchers.actions';
	import {mapGetters} from 'vuex';
	import AddVoucherForm from '../../../components/Dashboard/Voucher/AddVoucherForm';
	import eventBus from '../../../utils/event-bus';

	export default {
		components: {AddVoucherForm},
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {
				addFormVisible: this.showAddForm() || false,
				editFormVisible: this.showEditForm() || false,
			};
		},
		computed: {
			...mapGetters(['getVouchers'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addVoucherFormVisible', false) : eventBus.$emit('addVoucherFormVisible', true);
				eventBus.$on('addVoucherFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			},
			showEditForm(index, ingredients) {
				let data = {};
				if (ingredients) {
					data = {
						uuid: ingredients[index].uuid,
						name: ingredients[index].name,
						quantity: ingredients[index].quantity
					};
				}
				this.editFormVisible
					? eventBus.$emit('editIngredientFormVisible', {data: data || null, visible: false})
					: eventBus.$emit('editIngredientFormVisible', {data: data || null, visible: true});

				eventBus.$on('editIngredientFormVisible', payload => {
					this.editFormVisible = !payload.visible;
				});
			},
			deleteVoucher(index, vouchers) {
				return this.$store.dispatch(STORE_DELETE_VOUCHER_REQUEST, vouchers[index].uuid);
			}
		},
		async asyncData({store}) {
			const vouchers = await store.dispatch(STORE_GET_VOUCHERS_REQUEST);
			store.commit(STORE_GET_VOUCHERS_REQUEST_SUCCESS, vouchers);
		}
	};
</script>
