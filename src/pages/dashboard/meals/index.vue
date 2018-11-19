<template>
  <div>
    <div class="Title">
      <h1>Meals</h1>
    </div>
    <div class="Actions">
      <el-button 
        class="Actions__add-button" 
        size="medium" 
        @click="showAddForm"
      >Add</el-button>
      <AddMealForm />
      <EditMealForm />
    </div>
    <el-table
      class="Table"
      ref="multipleTable"
      :data="this.getMeals"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="50%"
      />
      <el-table-column
        property="reference"
        label="Reference"
      />
      <el-table-column
        property="name"
        label="Name"
      />
      <el-table-column
        property="description"
        label="Description"
      />
      <el-table-column
        property="price"
        label="Price (in €)"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewMeal(scope.$index, getMeals)"
            class="Table__view-button"
            size="small"
          >
            View
          </el-button>
          <el-button
            @click.native.prevent="showEditForm(scope.$index, getMeals)"
            class="Table__view-button"
            size="small"
          >
            Update
          </el-button>
          <el-button
            @click.native.prevent="deleteMeal(scope.$index, getMeals)"
            class="Table__view-button"
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
	import {mapGetters} from 'vuex';
	import eventBus from '../../../utils/event-bus';
	import {
		STORE_GET_MEALS_REQUEST,
		STORE_GET_MEALS_REQUEST_SUCCESS,
		STORE_DELETE_MEAL_REQUEST
	} from '../../../store/actions/store/store.meals.actions';
	import AddMealForm from '../../../components/Dashboard/Meal/AddMealForm';
	import EditMealForm from '../../../components/Dashboard/Meal/EditMealForm';
	import {
		STORE_GET_PRODUCTS_REQUEST,
		STORE_GET_PRODUCTS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.products.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		components: {AddMealForm, EditMealForm },
		data() {
			return {editFormVisible: this.showEditForm() || false};
		},
		computed: {
			...mapGetters(['getMeals'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addMealFormVisible', false) : eventBus.$emit('addMealFormVisible', true);
				eventBus.$on('addMealFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			},
			viewMeal(index, meals) {
				this.$router.push(`/dashboard/meals/${meals[index].uuid}`);
			},
			deleteMeal(index, meals){
				return this.$store.dispatch(STORE_DELETE_MEAL_REQUEST, meals[index].uuid);
			},
			showEditForm(index, meals) {
				let data = {};
				if (meals) {

					data = {
						uuid: meals[index].uuid,
						reference: meals[index].reference,
						name: meals[index].name,
						description: meals[index].description,
						price: meals[index].price,
						productQuantity: meals[index].productQuantity,
						subsections: meals[index].subsections
					};
				}
				this.editFormVisible
					? eventBus.$emit('editMealFormVisible', {data: data || null, visible: false})
					: eventBus.$emit('editMealFormVisible', {data: data || null, visible: true});

				eventBus.$on('editMealFormVisible', payload => {
					this.editFormVisible = !payload.visible;
				});
			}
		},
		async asyncData({store}) {
			const meals = await store.dispatch(STORE_GET_MEALS_REQUEST);
			const products = await store.dispatch(STORE_GET_PRODUCTS_REQUEST);

			store.commit(STORE_GET_MEALS_REQUEST_SUCCESS, meals);
			store.commit(STORE_GET_PRODUCTS_REQUEST_SUCCESS, products);
		}
	};
</script>
