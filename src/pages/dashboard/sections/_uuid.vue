<template>

  <div>
    <div>
      <div class="Title">
        <h1>{{ section.name }}</h1>

        <p>Meals: {{ section.meals.length }}</p>
        <p>Products: {{ section.products.length }}</p>
        <br>
      </div>
      <div>
        <div class="Title">
          <h1>Meals</h1>
        </div>
        <el-table
          class="Table"
          ref="multipleTable"
          :data="section.meals"
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
            width="250"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="viewMeal(scope.$index, section.meals)"
                class="Table__view-button"
                size="small"
              >
                View
              </el-button>

              <el-button
                @click.native.prevent="removeMeal(scope.$index, section.meals)"
                class="Table__view-button"
                size="small"
              >
                Remove
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div>
      <div class="Title">
        <h1>Products</h1>
      </div>
      <el-table
        class="Table"
        ref="multipleTable"
        :data="section.products"
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
          width="220"
        >

          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showEditForm(scope.$index, section.products)"
              class="Table__delete-button"
              size="small"
            >
              View
            </el-button>
            <el-button
              @click.native.prevent="removeProduct(scope.$index, section.products)"
              class="Table__delete-button"
              size="small"
            >
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>

	import {STORE_GET_SECTIONS_REQUEST, STORE_GET_SECTIONS_REQUEST_SUCCESS, STORE_REMOVE_SECTION_PRODUCT_REQUEST} from '../../../store/actions/store/store.sections.actions';

	export default {
		layout: 'Dashboard/DashboardLayout',
		name: 'Section',
		data() {
			return {};
		},
		methods: {
			viewMeal(index, meals){
				this.$router.push(`/dashboard/meals/${meals[index].uuid}`);
			},
			removeProduct(index, products){

				let data = {
					uuid: this.section.uuid,
					products: [products[index].uuid]
				};

				return this.$store.dispatch(STORE_REMOVE_SECTION_PRODUCT_REQUEST, data);

			},
			async removeMeal(index, meals){

				let data = {
					uuid: this.section.uuid,
					meals: [meals[index].uuid]
				};

				await this.$store.dispatch(STORE_REMOVE_SECTION_PRODUCT_REQUEST, data);
				window.location.reload();
			}
		}
	,
		async asyncData({store, params}) {
			const sections = await store.dispatch(STORE_GET_SECTIONS_REQUEST);
			store.commit(STORE_GET_SECTIONS_REQUEST_SUCCESS, sections);
			return {section: sections.data.find(section => section.uuid === params.uuid)};
		}
	}
</script>

<style scoped>

</style>
