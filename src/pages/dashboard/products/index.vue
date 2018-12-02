<template>
  <div>
    <div class="Title">
      <h1>Products</h1>
    </div>
    <div class="Actions">
      <el-button 
        class="Actions__add-button" 
        size="medium" 
        @click="showAddForm"
      >Add</el-button>
      <AddProductForm />
      <EditProductForm />
      <AddProductPicture />
    </div>
    <el-table
      class="Table"
      ref="multipleTable"
      :data="this.getProducts"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="50%"
      />
      <el-table-column
        property="reference"
        label="Reference"
      />
      <el-table-column
        property="ean13"
        label="EAN13"
      />
      <el-table-column
        property="name"
        label="Name"
      />
      <el-table-column
        property="description"
        label="Description"
      />
      <el-table-column
        property="price"
        label="Price (in €)"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        width="300"
      >

        <template slot-scope="scope">
          <el-button
            @click.native.prevent="showAddPictureForm(scope.$index, getProducts)"
            class="Table__delete-button"
            size="small"
          >
            Add Picture
          </el-button>
          <el-button
            @click.native.prevent="showEditForm(scope.$index, getProducts)"
            class="Table__delete-button"
            size="small"
          >
            Update
          </el-button>
          <el-button
            @click.native.prevent="deleteProduct(scope.$index, getProducts)"
            class="Table__delete-button"
            size="small"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import eventBus from '../../../utils/event-bus';
	import {
		STORE_GET_PRODUCTS_REQUEST,
		STORE_GET_PRODUCTS_REQUEST_SUCCESS,
		STORE_DELETE_PRODUCT_REQUEST,

	} from '../../../store/actions/store/store.products.actions';
	import {
		STORE_GET_INGREDIENTS_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST_SUCCESS,
	} from '../../../store/actions/store/store.ingredients.actions';
	import AddProductForm from '../../../components/Dashboard/Product/AddProductForm';
	import EditProductForm from '../../../components/Dashboard/Product/EditProductForm';
	import AddProductPicture from '../../../components/Dashboard/Product/AddProductPicture';

	export default {
		components: {EditProductForm, AddProductForm, AddProductPicture },
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {
				editFormVisible: this.showEditForm() || false,
				editForm: {
					uuid: '',
					reference: '',
					ean13: '',
					name: '',
					price: '',
					description: '',
					ingredients: []
				}

			};
		},
		computed: {
			...mapGetters(['getProducts'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addProductFormVisible', false) : eventBus.$emit('addProductFormVisible', true);
				eventBus.$on('addProductFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			},
			showAddPictureForm(index, products){

				let data = {};
				if (products) {

					data = {
						uuid: products[index].uuid,
					};
				}
				this.editFormVisible
					? eventBus.$emit('AddProductPictureFormVisible', { data: data || null,visible: false})
					: eventBus.$emit('AddProductPictureFormVisible', { data: data || null,visible: true});

				eventBus.$on('AddProductPictureFormVisible', payload => {
					this.editFormVisible = !payload.visible;
				});
			},
			showEditForm(index, products) {
				let data = {};
				if (products) {
					data = {
						uuid: products[index].uuid,
						reference: products[index].reference,
						ean13: products[index].ean13,
						name: products[index].name,
						price: products[index].price,
						description: products[index].description,
					};
				}
				this.editFormVisible
					? eventBus.$emit('editProductFormVisible', {data: data || null, visible: false})
					: eventBus.$emit('editProductFormVisible', {data: data || null, visible: true});

				eventBus.$on('editProductFormVisible', payload => {
					this.editFormVisible = !payload.visible;
				});
			},
			deleteProduct(index, products) {
				return this.$store.dispatch(STORE_DELETE_PRODUCT_REQUEST, products[index].uuid);
			},
		},
		async asyncData({store}) {

			const ingredients = await store.dispatch(STORE_GET_INGREDIENTS_REQUEST);
			store.commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, ingredients);

			const products = await store.dispatch(STORE_GET_PRODUCTS_REQUEST);
			store.commit(STORE_GET_PRODUCTS_REQUEST_SUCCESS, products);
		}
	};
</script>
