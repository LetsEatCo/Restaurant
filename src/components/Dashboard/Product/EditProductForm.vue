<template>
	<el-dialog title="Edit Product" custom-class="Actions__edit-dialog" :visible.sync="formVisible" top="10vh"
						 width="35%" @close="closeForm()">
		<el-form label-position="top" ref="form" :model="form" :rules="rules">
			<el-form-item label="Reference" prop="reference">
				<el-input placeholder="Product Reference" v-model="form.reference"
									autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="EAN13" prop="ean13">
				<el-input placeholder="EAN13 code" v-model="form.ean13"
									autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Product Name" prop="name">
				<el-input placeholder="Eg. Burger, Sushi, Tacos" v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Price" prop="price">
				<el-input-number :min="0" placeholder="In €" v-model="form.price" autocomplete="off"></el-input-number>
			</el-form-item>
			<el-form-item label="Description">
				<el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Ingredients">
				<el-cascader multiple placeholder="Ingredients"
										 :options="options()" @change="addProductIngredient">
				</el-cascader>
			</el-form-item>
			<el-form-item>
				<el-tag :key="ingredient.ingredientUuid" v-for="ingredient in form.ingredients" closable @close="handleTagClose(ingredient)">
					{{getIngredientByUuid(ingredient.ingredientUuid).name}} ({{ingredient.quantity}})
				</el-tag>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button class="cancel-button"
								 @click="closeForm()">Cancel
			</el-button>
			<el-button class="add-button" @click="updateProduct('form')">Edit Product</el-button>
		</div>
	</el-dialog>
</template>

<script>

	import eventBus from '../../../utils/event-bus';
	import {STORE_UPDATE_PRODUCT_REQUEST} from '../../../store/actions/store/store.products.actions';
	import {mapGetters} from 'vuex';
	import {quantityRange} from '../../../utils/quantity-range';

	export default {
		name: 'EditProductForm',
		data() {
			return {
				formVisible: this.showForm() || false,
				form: {
					uuid: '',
					reference: '',
					ean13: '',
					name: '',
					price: '',
					description: '',
					ingredients: []
				},
				rules: {
					reference: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'},
						{max: 16, message: 'Reference should not be greater than 16', trigger: 'blur'}
					],
					ean13: [
						{min: 13, message: 'EAN13 length should be 13', trigger: 'blur'},
						{max: 13, message: 'EAN13 length should be 13', trigger: 'blur'}
					],
					name: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'}
					],
					price: [
						{required: true, message: 'Please, enter a price', trigger: 'blur'}
					]
				}
			};
		},
		computed: {
			...mapGetters(['getIngredients', 'getIngredientByUuid'])
		},
		methods: {
			options() {
				const options = [];
				this.getIngredients.forEach((ingredient) => {
					options.push({
						value: ingredient.uuid,
						label: ingredient.name,
						children: quantityRange()
					});
				});
				return options;
			},
			addProductIngredient(value) {

				if (this.form.ingredients.some(ingredient => ingredient.ingredientUuid === value[0])){
					return false;
				}
				this.form.ingredients.push({ingredientUuid: value[0], quantity: value[1]});
			},
			handleTagClose(tag){
				this.form.ingredients.splice(this.form.ingredients.indexOf(tag), 1);
			},
			showForm() {
				eventBus.$on('editProductFormVisible', payload => {

					this.form.uuid = payload.data.uuid;
					this.form.reference = payload.data.reference;
					this.form.ean13 = payload.data.ean13;
					this.form.name = payload.data.name;
					this.form.price = payload.data.price;
					this.form.description = payload.data.description;
					// this.form.ingredients = payload.data.ingredients;
					this.formVisible = payload.visible;
				});
			},
			closeForm() {
				this.formVisible = false;
			},
			async updateProduct(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {

						const data = {
							uuid: this.form.uuid,
							reference: this.form.reference,
							ean13: this.form.ean13,
							name: this.form.name,
							price: this.form.price.toString(),
							description: this.form.description,
							ingredients: this.form.ingredients
						};

						return this.$store.dispatch(STORE_UPDATE_PRODUCT_REQUEST, data);
					} else {
						return false;
					}
				});
			}
		}
	};
</script>

<style scoped>

</style>
