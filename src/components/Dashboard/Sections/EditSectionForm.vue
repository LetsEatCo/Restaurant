<template>
  <el-dialog
    title="Edit Meal"
    custom-class="Actions__edit-dialog"
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

        <el-form-item
          label="Section Name"
          prop="name"
        >
          <el-input
            placeholder="Eg. Menu Burger, Sushi Rolls for 4..."
            v-model="form.name"
            autocomplete="off"
          />
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
        @click="updateSection('form')"
      >Edit Section</el-button>
    </div>
  </el-dialog>
</template>

<script>
	import eventBus from '../../../utils/event-bus';
	import {mapGetters} from 'vuex';
	import {STORE_UPDATE_SECTION_REQUEST} from '../../../store/actions/store/store.sections.actions';

	export default {
		name: 'EditSectionForm',
		data() {

			return {
				formVisible: this.showForm() || false,
				informationsTabVisible: true,
				subsectionsTabVisible: false,
				form: {
					name: '',
				},
				rules: {
					reference: [
						{required: false, message: 'Please, enter a name', trigger: 'blur'},
						{max: 16, message: 'Reference should not be greater than 16', trigger: 'blur'}
					],
					name: [
						{required: false, message: 'Please, enter a name', trigger: 'blur'}
					],
					price: [
						{required: false, message: 'Please, enter a price', trigger: 'blur'}
					],
				}
			};
		},
		computed: {
			...mapGetters(['getProducts', 'getIngredients', 'getIngredientByUuid'])
		},
		methods: {
			showForm() {
				eventBus.$on('editSectionFormVisible', payload => {

					this.form.uuid = payload.data.uuid;
					this.form.name = payload.data.name;
					this.formVisible = payload;
				});
			},
			closeForm() {
				this.formVisible = false;
			},

			async updateSection(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {


						const data = {
							uuid: this.form.uuid,
							name: this.form.name,
						};
						this.$store.dispatch(STORE_UPDATE_SECTION_REQUEST, data);
						this.form = {};
						this.closeForm();
						return true;
					} else {
						return false;
					}
				});
			}
		}
	};
</script>
