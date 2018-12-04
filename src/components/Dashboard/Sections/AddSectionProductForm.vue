<template>
  <el-dialog
    title="Add Products"
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
      <div :style="{display: 'block'}">

        <el-form-item label="Meals">
          <el-cascader
            multiple
            placeholder="Meals"
            :options="optionMeals()"
            @change="addSectionMeal"
          />
        </el-form-item>

        <el-form-item>
          <el-tag
            :key="meal.uuid"
            v-for="meal in form.meals"
            closable
            @close="handleTagMealClose(meal)"
          >
            {{ getMealByUuid(meal.uuid).name }}
          </el-tag>
        </el-form-item>

        <el-form-item label="Products">
          <el-cascader
            multiple
            placeholder="Products"
            :options="optionProducts()"
            @change="addSectionProduct"
          />
        </el-form-item>

        <el-form-item>
          <el-tag
            :key="product.uuid"
            v-for="product in form.products"
            closable
            @close="handleTagProductClose(product)"
          >
            {{ getProductByUuid(product.uuid).name }}
          </el-tag>
        </el-form-item>

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
        @click="addSection('form')"
      >Add Section</el-button>
    </div>
  </el-dialog>
</template>

<script>

	import eventBus from '../../../utils/event-bus';
	import {mapGetters} from 'vuex';
	import {STORE_ADD_SECTION_PRODUCT_REQUEST} from '../../../store/actions/store/store.sections.actions';

    export default {
        name: "AddSectionProductForm",
			data() {
				return {
					formVisible: this.showForm() || false,
					form: {
						products: [],
						meals: []
					},
					rules: {
						name: [
							{required: true, message: 'Please, enter a name', trigger: 'blur'}
						]
					}
				};
			},
			computed: {
				...mapGetters(['getProducts', 'getMeals', 'getMealByUuid', 'getProductByUuid'])
			},
			methods: {
				optionMeals() {
					const options = [];
					this.getMeals.forEach((product) => {
						options.push({
							value: product.uuid,
							label: product.name,
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
						});
					});
					return options;
				},
				addSectionMeal(value) {
					if (this.form.meals.some(meal => meal.uuid === value[0])) {
						return false;
					}
					this.form.meals.push({uuid: value[0]});
				},
				addSectionProduct(value) {
					if (this.form.products.some(meal => meal.uuid === value[0])) {
						return false;
					}
					this.form.products.push({uuid: value[0]});
				},
				handleTagMealClose(tag) {
					this.form.meals.splice(this.form.meals.indexOf(tag), 1);
				}, handleTagProductClose(tag) {
					this.form.products.splice(this.form.products.indexOf(tag), 1);
				},
				showForm() {
					eventBus.$on('addSectionProductFormVisible', payload => {
						this.form.uuid = payload.data.uuid;
						this.formVisible = payload;
					});
				},
				closeForm() {
					this.formVisible = false;
				},
				async addSection(form) {
					this.$refs[form].validate((valid) => {
						if (valid) {

							let products = [];
							let meals = [];

							this.form.meals.forEach(meal => {
								meals.push(meal.uuid)
							});

							this.form.products.forEach(product => {
								products.push(product.uuid)
							});

							const data = {
								uuid: this.form.uuid,
								products: products,
								meals: meals
							};
							this.closeForm();
							return this.$store.dispatch(STORE_ADD_SECTION_PRODUCT_REQUEST, data);
						} else {
							return false;
						}
					});
				}
			}
    }
</script>

<style scoped>

</style>
