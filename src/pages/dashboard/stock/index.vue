<template>
	<div>
		<div class="Title">
			<h1>Stock</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add-button" size="medium" @click="showAddForm">Add</el-button>
			<AddIngredientForm/>
			<EditIngredientForm/>
		</div>
		<el-table
			class="Table"
			ref="multipleTable"
			:data="this.getIngredients"
			stripe
			style="width: 100%">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				property="name"
				label="Name">
			</el-table-column>
			<el-table-column
				property="quantity"
				label="Quantity">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="Operations"
				width="220">
				<template slot-scope="scope">
					<el-button
						@click.native.prevent="showEditForm(scope.$index, getIngredients)"
						class="Table__delete-button"
						size="small">
						Update
					</el-button>
					<el-button
						@click.native.prevent="deleteIngredient(scope.$index, getIngredients)"
						class="Table__delete-button"
						size="small">
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		STORE_DELETE_INGREDIENT_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST_SUCCESS,
	} from '../../../store/actions/store/store.ingredients.actions';
	import {mapGetters} from 'vuex';
	import AddIngredientForm from '../../../components/Dashboard/Stock/AddIngredientForm';
	import eventBus from '../../../utils/event-bus';
	import EditIngredientForm from '../../../components/Dashboard/Stock/EditIngredientForm';

	export default {
		components: {EditIngredientForm, AddIngredientForm},
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {
				addFormVisible: this.showAddForm() || false,
				editFormVisible: this.showEditForm() || false,
				editForm: {
					uuid: '',
					name: '',
					quantity: ''
				}
			};
		},
		computed: {
			...mapGetters(['getIngredients'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addIngredientFormVisible', false) : eventBus.$emit('addIngredientFormVisible', true);
				eventBus.$on('addIngredientFormVisible', payload => {
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
			deleteIngredient(index, ingredients) {
				return this.$store.dispatch(STORE_DELETE_INGREDIENT_REQUEST, ingredients[index].uuid);
			}
		},
		async asyncData({store}) {
			const ingredients = await store.dispatch(STORE_GET_INGREDIENTS_REQUEST);
			store.commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, ingredients);
		}
	};
</script>
