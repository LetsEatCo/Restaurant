<template>
	<el-dialog title="Add Ingredient" custom-class="Actions__add-dialog" :visible.sync="formVisible" top="30vh"
						 width="35%" @close="closeForm()">
		<el-form ref="form" :model="form">
			<el-form-item label="Ingredient Name">
				<el-input placeholder="Eg. Salad" v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Quantity">
				<el-input placeholder="Ingredient quantity available in your stock" v-model="form.quantity"
									autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button class="cancel-button"
								 @click="formVisible = false">Cancel
			</el-button>
			<el-button class="add-button" @click="addIngredient">Add Ingredient</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {STORE_CREATE_INGREDIENT_REQUEST} from '../../../store/actions/store/store.ingredients.actions';
	import eventBus from '../../../utils/event-bus';

	export default {
		name: 'AddIngredientForm',
		props: {
			isFormVisible: Boolean
		},
		data() {
			return {
				formVisible: this.showForm() || false,
				form: {
					name: '',
					quantity: ''
				}
			};
		},
		methods: {
			showForm() {
				eventBus.$on('addIngredientFormVisible', payload => {
					this.formVisible = payload;
				});
			},
			closeForm() {
				this.formVisible
					? eventBus.$emit('addIngredientFormVisible', false)
					: eventBus.$emit('addIngredientFormVisible', true);
				this.formVisible = false;
			},
			addIngredient() {
				const data = {
					name: this.form.name,
					quantity: parseInt(this.form.quantity)
				};
				return this.$store.dispatch(STORE_CREATE_INGREDIENT_REQUEST, data);
			}
		}
	};
</script>
