<template>
	<el-dialog title="Add Meal" custom-class="Actions__add-dialog" :visible.sync="formVisible" top="10vh"
						 width="35%" @close="closeForm()">
		<el-form label-position="top" ref="form" :model="form" :rules="rules">
			<div class="Actions__add-dialog__tabs">
				<p @click="handleTabSwitch(1)">Informations</p>
				<p @click="handleTabSwitch(2)">Subsections</p>
			</div>
			<div v-if="informationsTabVisible">
				<el-form-item label="Reference" prop="reference">
					<el-input placeholder="Product Reference" v-model="form.reference"
										autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Meal Name" prop="name">
					<el-input placeholder="Eg. Menu Burger, Sushi Rolls for 4..." v-model="form.name"
										autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Price" prop="price">
					<el-input-number :min="0" placeholder="In €" v-model="form.price" autocomplete="off"></el-input-number>
				</el-form-item>
				<el-form-item label="Description">
					<el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Product" prop="product">
					<el-select v-model="form.productUuid" placeholder="Select"
										 @change="handleProductSelectChange(form.productUuid)">
						<el-option
							v-for="product in getProducts"
							:key="product.uuid"
							:label="product.name"
							:value="product.uuid">
						</el-option>
					</el-select>
				</el-form-item>
			</div>
		</el-form>
		<div slot="footer">
			<el-button class="cancel-button"
								 @click="formVisible = false">Cancel
			</el-button>
			<el-button class="add-button" @click="addMeal('form')">Add Meal</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import eventBus from '../../../utils/event-bus';
	import {mapGetters} from 'vuex';
	import {quantityRange} from '../../../utils/quantity-range';
	import {STORE_CREATE_MEAL_REQUEST} from '../../../store/actions/store/store.meals.actions';

	export default {
		name: 'AddMealForm',
		data() {
			const validateProduct = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please select a Product'));
				} else {
					callback();
				}
			};
			return {
				formVisible: this.showForm() || false,
				informationsTabVisible: true,
				subsectionsTabVisible: false,
				form: {
					reference: '',
					name: '',
					price: '',
					description: '',
					productUuid: ''
				},
				rules: {
					reference: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'},
						{max: 16, message: 'Reference should not be greater than 16', trigger: 'blur'}
					],
					name: [
						{required: true, message: 'Please, enter a name', trigger: 'blur'}
					],
					price: [
						{required: true, message: 'Please, enter a price', trigger: 'blur'}
					],
					product: [
						{validator: validateProduct, trigger: 'blur'}
					]
				}
			};
		},
		computed: {
			...mapGetters(['getProducts', 'getIngredientByUuid'])
		},
		methods: {
			options() {
				const options = [];
				this.getProducts.forEach((product) => {
					options.push({
						value: product.uuid,
						label: product.name,
						children: quantityRange(1, 20)
					});
				});
				return options;
			},
			addProductIngredient(value) {
				if (this.form.ingredients.some(ingredient => ingredient.ingredientUuid === value[0])) {
					return false;
				}
				this.form.ingredients.push({ingredientUuid: value[0], quantity: value[1]});
			},
			handleTabSwitch(index) {
				if (index === 1) {
					this.informationsTabVisible = true;
					this.subsectionsTabVisible = false;
				} else {
					this.informationsTabVisible = false;
					this.subsectionsTabVisible = true;
				}
			},
			handleTagClose(tag) {
				this.form.ingredients.splice(this.form.ingredients.indexOf(tag), 1);
			},
			handleProductSelectChange(productUuid) {
				this.form.productUuid = productUuid;
			},
			showForm() {
				eventBus.$on('addMealFormVisible', payload => {
					this.formVisible = payload;
				});
			},
			closeForm() {
				this.formVisible
					? eventBus.$emit('addMealFormVisible', false)
					: eventBus.$emit('addMealFormVisible', true);
				this.formVisible = false;
			},
			async addMeal(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						const data = {
							reference: this.form.reference,
							name: this.form.name,
							price: this.form.price.toString(),
							description: this.form.description,
							productUuid: this.form.productUuid
						};
						return this.$store.dispatch(STORE_CREATE_MEAL_REQUEST, data);
					} else {
						return false;
					}
				});
			}
		}
	};
</script>
