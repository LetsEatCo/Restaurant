<template>
  <div>
    <div class="Title">
      <h1>Orders</h1>
    </div>

    <el-table
      class="Table"
      ref="multipleTable"
      :data="this.getOrders"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        property="reference"
        label="Reference"
      />
      <el-table-column
        property="totalPaid"
        label="Total Paid (in €)"
      />
      <el-table-column
        property="phoneNumber"
        label="Phone number"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewOrder(scope.$index, getOrders)"
            class="Table__delete-button"
            size="small"
          >
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
	import {
		STORE_GET_ORDERS_REQUEST,
		STORE_GET_ORDERS_REQUEST_SUCCESS,
	} from '../../../store/actions/store/store.orders.actions';
	import {mapGetters} from 'vuex';

	export default {

		layout: 'Dashboard/DashboardLayout',
		computed: {
			...mapGetters(['getOrders'])
		},
		methods: {
			viewOrder(index, orders) {
				this.$router.push(`/dashboard/orders/${orders[index].uuid}`);
			}
		},
		async asyncData({store}) {
			const orders = await store.dispatch(STORE_GET_ORDERS_REQUEST);
			store.commit(STORE_GET_ORDERS_REQUEST_SUCCESS, orders);
		}
	};
</script>
