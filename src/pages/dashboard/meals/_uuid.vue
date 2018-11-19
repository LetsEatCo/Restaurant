<template>
  <div>
    <div class="Title">
      <h1>{{ meal.name }}</h1>
    </div>
    <div class="Informations">
      <h2>Informations</h2>
      <p>Name: {{ meal.name }}</p>
      <p>Reference: {{ meal.reference }}</p>
      <p>Price: {{ meal.price }}€</p>
      <p>Description: {{ meal.description }}</p>
    </div>
    <div class="Subsections">
      <h2>Subsections</h2>
      <div 
        class="Subsection" 
        v-for="subsection of meal.subsections" 
        :key="subsection.uuid"
      >
        <div class="Subsection__informations">
          <p class="Subsection__informations__name">{{ subsection.name }}</p>
          <p>Is required ?: {{ subsection.isRequired }}</p>
          <p>Max selections: {{ subsection.maxSelectionsPermitted }}</p>
          <p>Min selections: {{ subsection.minSelectionsPermitted }}</p>
        </div>
        <h4>Ingredients</h4>
        <el-table
          :data="subsection.options.ingredients"
          style="width: 100%"
          class="Table"
        >
          <el-table-column
            prop="ingredient.name"
            label="Name"
          />
          <el-table-column
            prop="price"
            label="Additional price"
          />
          <el-table-column
            prop="quantity"
            label="Quantity"
          />
        </el-table>
        <h4>Products</h4>
        <el-table
          :data="subsection.options.products"
          style="width: 100%"
          class="Table"
        >
          <el-table-column
            prop="product.name"
            label="Name"
          />
          <el-table-column
            prop="price"
            label="Additional price"
          />
          <el-table-column
            prop="quantity"
            label="Quantity"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
	import {
		STORE_GET_MEALS_REQUEST,
		STORE_GET_MEALS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.meals.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		name: 'Meal',
		data() {
			return {};
		},
		validate({params}) {

			return true;
		},
		async asyncData({store, params}) {
			const meals = await store.dispatch(STORE_GET_MEALS_REQUEST);
			store.commit(STORE_GET_MEALS_REQUEST_SUCCESS, meals);
			return {meal: meals.data.find(meal => meal.uuid === params.uuid)};
		}
	};
</script>

<style lang="scss" scoped>
	.Subsection__informations {
		display: flex;
		align-items: center;
		> * {
			margin-right: 35px;
		}
		&__name {
			font-size: 22px;
			font-weight: 600;
		}
	}
</style>
