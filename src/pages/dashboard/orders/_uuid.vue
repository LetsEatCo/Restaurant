<template>

  <div>
    <div>
      <div class="Title">
        <h1>{{ order.reference }}</h1>

        <p>Meals: {{ order.detailsMeals.length }}</p>
        <p>Products: {{ order.detailsMeals.length }}</p>
        <br>
      </div>
      <div>
        <div class="Title">
          <h1>Meals</h1>
        </div>
        <!--<el-table-->
        <!--class="Table"-->
        <!--ref="multipleTable"-->
        <!--:data="order.detailsMeals"-->
        <!--stripe-->
        <!--style="width: 100%"-->
        <!--&gt;-->
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="50%"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--property="reference"-->
        <!--label="Reference"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--property="name"-->
        <!--label="Name"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--property="description"-->
        <!--label="Description"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--property="price"-->
        <!--label="Price (in €)"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="Operations"-->
        <!--width="250"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--@click.native.prevent="viewMeal(scope.$index, section.meals)"-->
        <!--class="Table__view-button"-->
        <!--size="small"-->
        <!--&gt;-->
        <!--View-->
        <!--</el-button>-->

        <!--<el-button-->
        <!--@click.native.prevent="removeMeal(scope.$index, section.meals)"-->
        <!--class="Table__view-button"-->
        <!--size="small"-->
        <!--&gt;-->
        <!--Remove-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
      </div>
    </div>

    <div>
      <div class="Title">
        <h1>Products</h1>
      </div>
      <!--<el-table-->
      <!--class="Table"-->
      <!--ref="multipleTable"-->
      <!--:data="order.detailsProducts"-->
      <!--stripe-->
      <!--style="width: 100%"-->
      <!--&gt;-->
      <!--<el-table-column-->
      <!--type="selection"-->
      <!--width="50%"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--property="reference"-->
      <!--label="Reference"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--property="ean13"-->
      <!--label="EAN13"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--property="name"-->
      <!--label="Name"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--property="description"-->
      <!--label="Description"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--property="price"-->
      <!--label="Price (in €)"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--fixed="right"-->
      <!--label="Operations"-->
      <!--width="220"-->
      <!--&gt;-->

      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--@click.native.prevent="showEditForm(scope.$index, section.products)"-->
      <!--class="Table__delete-button"-->
      <!--size="small"-->
      <!--&gt;-->
      <!--View-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--@click.native.prevent="removeProduct(scope.$index, section.products)"-->
      <!--class="Table__delete-button"-->
      <!--size="small"-->
      <!--&gt;-->
      <!--Remove-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
    </div>

  </div>

</template>

<script>

	import {STORE_GET_ORDERS_REQUEST,STORE_GET_ORDERS_REQUEST_SUCCESS} from '../../../store/actions/store/store.orders.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		name: 'Order',
		data() {
			return {};
		},
		methods: {
			viewMeal(index, meals){
				this.$router.push(`/dashboard/meals/${meals[index].uuid}`);
			},
		}
		,
		async asyncData({store, params}) {
			const orders = await store.dispatch(STORE_GET_ORDERS_REQUEST);
			store.commit(STORE_GET_ORDERS_REQUEST_SUCCESS, orders);
			return {order: orders.data.find(order => order.uuid === params.uuid)};
		}
	}
</script>

<style scoped>

</style>
