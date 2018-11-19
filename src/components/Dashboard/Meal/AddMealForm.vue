<template>
  <el-dialog
    title="Add Meal"
    custom-class="Actions__add-dialog"
    :visible.sync="formVisible"
    top="10vh"
    width="35%"
    @close="closeForm()"
  >
    <el-form
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
    >
      <div class="Actions__add-dialog__tabs">
        <p @click="handleTabSwitch(1)">Informations</p>
        <p @click="handleTabSwitch(2)">Subsections</p>
        <el-button
          v-if="subsectionsTabVisible"
          size="medium"
          @click="addSubsection"
        >
          Add Subsection
        </el-button>
      </div>
      <div :style="{display: informationsTabVisible ? 'block' : 'none'}">
        <el-form-item
          label="Reference"
          prop="reference"
        >
          <el-input
            placeholder="Product Reference"
            v-model="form.reference"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Meal Name"
          prop="name"
        >
          <el-input
            placeholder="Eg. Menu Burger, Sushi Rolls for 4..."
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Price"
          prop="price"
        >
          <el-input-number
            :precision="2"
            :step="0.01"
            :min="0"
            placeholder="In €"
            v-model="form.price"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Product"
          prop="product"
        >
          <el-select
            v-model="form.productUuid"
            placeholder="Select"
            @change="handleProductSelectChange(form.productUuid)"
          >
            <el-option
              v-for="product in getProducts"
              :key="product.uuid"
              :label="product.name"
              :value="product.uuid"
            />
          </el-select>
        </el-form-item>
      </div>
      <div :style="{display: subsectionsTabVisible ? 'block' : 'none'}">
        <div
          v-for="(subsection, index) in form.subsections"
          :key="index"
          class="Actions__add-dialog__subsection"
          :prop="subsection"
        >
          <div class="Actions__add-dialog__subsection__header">
            <p class="Actions__add-dialog__subsection__header__title">Subsection {{ index+1 }}</p>
            <el-button
              type="text"
              size="medium"
              class="Actions__add-dialog__subsection__header__button"
              @click.prevent="removeSubsection(subsection)"
            >
              Delete
            </el-button>
          </div>
          <div class="Actions__add-dialog__subsection__actions">
            <el-button
              type="text"
              size="medium"
              class="Actions__add-dialog__subsection__header__button"
              @click="addSubsectionIngredientForm(index)"
            >Add Ingredient
            </el-button>
            <el-button
              type="text"
              size="medium"
              class="Actions__add-dialog__subsection__header__button"
              @click="addSubsectionProductForm(index)"
            >Add Product
            </el-button>
          </div>
          <el-form-item
            label="Name"
            prop="subsection"
          >
            <el-input v-model="subsection.name" />
          </el-form-item>
          <div class="Actions__add-dialog__subsection__input-number">
            <div class="Actions__add-dialog__subsection__input-number-group">
              <p>Min selections</p>
              <el-input-number
                label="Min selections"
                v-model="subsection.minSelectionsPermitted"
                :min="0"
                :max="100"
              />
            </div>
            <div class="Actions__add-dialog__subsection__input-number-group">
              <p>Max selections</p>
              <el-input-number
                label="Max selections"
                v-model="subsection.maxSelectionsPermitted"
                :min="0"
                :max="100"
              />
            </div>
            <el-checkbox v-model="subsection.isRequired">Is Required ?</el-checkbox>
          </div>
          <el-form-item
            label="Ingredient"
            v-for="(optionIngredient, ingredientIndex) in subsection.options.ingredients"
            :key="ingredientIndex"
          >
            <el-select
              v-model="optionIngredient.ingredientUuid"
              placeholder="Select"
            >
              <el-option
                v-for="ingredient in getIngredients"
                :key="ingredient.uuid"
                :label="ingredient.name"
                :value="ingredient.uuid"
              />
            </el-select>
            <div class="Actions__add-dialog__subsection__input-number">
              <div class="Actions__add-dialog__subsection__input-number-group">
                <p>Extra Price</p>
                <el-input-number
                  v-model="optionIngredient.price"
                  :precision="2"
                  :step="0.01"
                  :min="0"
                  :max="100"
                />
              </div>
              <div class="Actions__add-dialog__subsection__input-number-group">
                <p>Quantity</p>
                <el-input-number
                  v-model="optionIngredient.quantity"
                  :min="1"
                  :max="100"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="Product"
            v-for="(optionProduct, optionProductIndex) in subsection.options.products"
            :key="optionProductIndex"
          >
            <el-select
              v-model="optionProduct.productUuid"
              placeholder="Select"
            >
              <el-option
                v-for="product in getProducts"
                :key="product.uuid"
                :label="product.name"
                :value="product.uuid"
              />
            </el-select>
            <div class="Actions__add-dialog__subsection__input-number">
              <div class="Actions__add-dialog__subsection__input-number-group">
                <p>Extra Price</p>
                <el-input-number
                  v-model="optionProduct.price"
                  :precision="2"
                  :step="0.01"
                  :min="0"
                  :max="100"
                />
              </div>
              <div class="Actions__add-dialog__subsection__input-number-group">
                <p>Quantity</p>
                <el-input-number
                  v-model="optionProduct.quantity"
                  :min="1"
                  :max="100"
                />
              </div>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer">
      <el-button
        class="cancel-button"
        @click="formVisible = false"
      >Cancel
      </el-button>
      <el-button
        class="add-button"
        @click="addMeal('form')"
      >Add Meal</el-button>
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
					productUuid: '',
					subsections: []
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
			...mapGetters(['getProducts', 'getIngredients', 'getIngredientByUuid'])
		},
		methods: {
			optionIngredients() {
				const options = [];
				this.getIngredients.forEach((product) => {
					options.push({
						value: product.uuid,
						label: product.name,
						children: quantityRange(1, 20)
					});
				});
				return options;
			},
			optionProducts() {
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
			addSubsectionIngredient(value) {
				if (this.form.subsections.some(subsection => {
					subsection.options.ingredients.some(ingredient => ingredient.ingredientUuid === value[0]);
				})) {
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
			addSubsection() {
				this.form.subsections.push({
					name: '',
					isRequired: false,
					minSelectionsPermitted: '',
					maxSelectionsPermitted: '',
					options: {
						products: [],
						ingredients: []
					}
				});
			},
			addSubsectionIngredientForm(index) {
				this.form.subsections[index].options.ingredients.push({
					ingredientUuid: '',
					price: '',
					quantity: ''
				});
			},
			addSubsectionProductForm(index) {
				this.form.subsections[index].options.products.push({
					productUuid: '',
					price: '',
					quantity: ''
				});
			},
			removeSubsection(subsection) {
				const index = this.form.subsections.indexOf(subsection);
				if (index !== -1) {
					this.form.subsections.splice(index, 1);
				}
			},
			async addMeal(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						this.form.subsections.forEach((subsection, subIdx) => {
							subsection.options.ingredients.forEach((ingredient, ingIdx) => {
								this.form.subsections[subIdx].options.ingredients[ingIdx].price
									= this.form.subsections[subIdx].options.ingredients[ingIdx].price.toString();
							});
							subsection.options.products.forEach((product, ingIdx) => {
								this.form.subsections[subIdx].options.products[ingIdx].price
									= this.form.subsections[subIdx].options.products[ingIdx].price.toString();
							});
						});

						const data = {
							reference: this.form.reference,
							name: this.form.name,
							price: this.form.price.toString(),
							description: this.form.description,
							productUuid: this.form.productUuid,
							subsections: this.form.subsections
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
