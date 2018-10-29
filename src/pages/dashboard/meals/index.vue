<template>
	<div>
		<div class="Title">
			<h1>Meals</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add-button" size="medium" @click="showAddForm">Add</el-button>
		</div>
		<el-table
			class="Table"
			ref="multipleTable"
			:data="this.getMeals"
			stripe
			style="width: 100%">
			<el-table-column
				type="selection"
				width="50%">
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
				property="description"
				label="Description">
			</el-table-column>
			<el-table-column
				property="price"
				label="Price (in €)">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="Operations"
				width="220">
				<template slot-scope="scope">
					<el-button
						@click.native.prevent="viewMeal(scope.$index, getMeals)"
						class="Table__view-button"
						size="small">
						View
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import eventBus from '../../../utils/event-bus';
	import {
		STORE_GET_MEALS_REQUEST,
		STORE_GET_MEALS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.meals.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {};
		},
		computed: {
			...mapGetters(['getMeals'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addProductFormVisible', false) : eventBus.$emit('addProductFormVisible', true);
				eventBus.$on('addProductFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			},
			viewMeal(index, meals) {
				this.$router.push(`/dashboard/meals/${meals[index].uuid}`);
			}
		},
		async asyncData({store}) {
			const meals = await store.dispatch(STORE_GET_MEALS_REQUEST);
			store.commit(STORE_GET_MEALS_REQUEST_SUCCESS, meals);
		}
	};
</script>
