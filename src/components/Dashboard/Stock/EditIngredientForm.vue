<template>
  <el-dialog
    title="Edit Ingredient"
    custom-class="Actions__edit-dialog"
    :visible.sync="formVisible"
    top="30vh"
    width="35%"
    @close="closeForm()"
  >
    <el-form
      ref="form"
      :model="form"
    >
      <el-form-item label="Ingredient Name">
        <el-input
          placeholder="Eg. Salad"
          v-model="form.name"
          autocomplete="off"
        >{{ form.name }}</el-input>
      </el-form-item>
      <el-form-item label="Quantity">
        <el-input
          placeholder="Ingredient quantity available in your stock"
          v-model="form.quantity"
          autocomplete="off"
        >{{ form.name }}
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button
        class="cancel-button"
        @click="formVisible = false"
      >Cancel
      </el-button>
      <el-button
        class="add-button"
        @click="updateIngredient"
      >Update Ingredient</el-button>
    </div>
  </el-dialog>
</template>

<script>
	import {
		STORE_UPDATE_INGREDIENT_REQUEST
	} from '../../../store/actions/store/store.ingredients.actions';
	import eventBus from '../../../utils/event-bus';
	import _ from 'lodash';

	export default {
		name: 'EditIngredientForm',
		data() {
			return {
				formVisible: this.showForm() || false,
				form: {
					uuid: '',
					name: '',
					quantity: ''
				}
			};
		},
		methods: {
			showForm() {
				eventBus.$on('editIngredientFormVisible', payload => {
					this.form.uuid = payload.data.uuid;
					this.form.name = payload.data.name;
					this.form.quantity = payload.data.quantity;
					this.formVisible = payload.visible;
				});
			},
			closeForm() {
				this.form = {};
				this.formVisible
					? eventBus.$emit('editIngredientFormVisible', {data: {}, visible: false})
					: eventBus.$emit('editIngredientFormVisible', {data: {}, visible: true});
				this.formVisible = false;
			},
			updateIngredient() {
				this.form.quantity = parseInt(this.form.quantity);
				const data = _.pickBy(this.form, v => v !== null && v !== undefined && v !== '');
				this.closeForm();
				return this.$store.dispatch(STORE_UPDATE_INGREDIENT_REQUEST, data);
			}
		}
	};
</script>
