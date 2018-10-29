<template>
	<div>
		<div class="Title">
			<h1>Products</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add-button" size="medium" @click="showAddForm">Add</el-button>
		</div>
		<el-table
			class="Table"
			ref="multipleTable"
			:data="this.getProducts"
			stripe
			style="width: 100%">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				property="reference"
				label="Reference">
			</el-table-column>
			<el-table-column
				property="name"
				label="Name">
			</el-table-column>
			<el-table-column
				property="price"
				label="Price (in €)">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="Operations"
				width="220">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import eventBus from '../../../utils/event-bus';
	import {
		STORE_GET_PRODUCTS_REQUEST,
		STORE_GET_PRODUCTS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.products.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {

			};
		},
		computed: {
			...mapGetters(['getProducts'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addProductFormVisible', false) : eventBus.$emit('addProductFormVisible', true);
				eventBus.$on('addProductFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			}
		},
		async asyncData({store}) {
			const products = await store.dispatch(STORE_GET_PRODUCTS_REQUEST);
			store.commit(STORE_GET_PRODUCTS_REQUEST_SUCCESS, products);
		}
	};
</script>
