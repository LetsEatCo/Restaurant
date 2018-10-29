<template>
	<div>
		<div class="Title">
			<h1>Products</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add-button" size="medium" @click="addFormVisible = true">Add</el-button>

			<el-dialog title="Edit Ingredient" custom-class="Actions__edit-dialog" :visible.sync="editFormVisible" top="30vh"
								 width="35%">
				<el-form ref="form" :model="editForm">
					<el-form-item label="Ingredient Name">
						<el-input placeholder="Eg. Salad" v-model="editForm.name" autocomplete="off">{{editForm.name}}</el-input>
					</el-form-item>
					<el-form-item label="Quantity">
						<el-input placeholder="Ingredient quantity available in your stock" v-model="editForm.quantity"
											autocomplete="off">{{editForm.name}}
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer">
					<el-button class="cancel-button"
										 @click="editFormVisible = false">Cancel
					</el-button>
					<el-button class="add-button" @click="updateIngredient">Update Ingredient</el-button>
				</div>
			</el-dialog>
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
		STORE_CREATE_INGREDIENT_REQUEST, STORE_DELETE_INGREDIENT_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST_SUCCESS, STORE_UPDATE_INGREDIENT_REQUEST
	} from '../../../store/actions/store/store.ingredients.actions';
	import {mapGetters} from 'vuex';
	import _ from 'lodash';

	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {
				addFormVisible: false,
				editFormVisible: false,
				form: {
					name: '',
					quantity: ''
				},
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
			addIngredient() {
				const data = {
					name: this.form.name,
					quantity: parseInt(this.form.quantity)
				};
				return this.$store.dispatch(STORE_CREATE_INGREDIENT_REQUEST, data);
			},
			deleteIngredient(index, ingredients) {
				return this.$store.dispatch(STORE_DELETE_INGREDIENT_REQUEST, ingredients[index].uuid);
			},
			updateIngredient() {
				this.editForm.quantity = parseInt(this.editForm.quantity);
				const data = _.pickBy(this.editForm, v => v !== null && v !== undefined && v !== '');
				return this.$store.dispatch(STORE_UPDATE_INGREDIENT_REQUEST, data);
			},
			showEditForm(index, ingredients) {
				this.editForm.uuid = ingredients[index].uuid;
				this.editForm.name = ingredients[index].name;
				this.editForm.quantity = ingredients[index].quantity;
				this.editFormVisible = true;
			}
		},
		async asyncData({store}) {
			const ingredients = await store.dispatch(STORE_GET_INGREDIENTS_REQUEST);
			store.commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, ingredients);
		}
	};
</script>
