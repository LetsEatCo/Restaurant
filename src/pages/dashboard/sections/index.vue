<template>
  <div>
    <div class="Title">
      <h1>Sections</h1>
    </div>
    <div class="Actions">
      <el-button
        class="Actions__add-button"
        size="medium"
        @click="showAddForm"
      >Add</el-button>

      <AddSectionForm />
      <EditSectionForm />
      <AddSectionProductForm />


    </div>

    <el-table
      class="Table"
      ref="multipleTable"
      :data="this.getSections"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="50%"
      />
      <el-table-column
        property="name"
        label="Name"
      />
      <el-table-column
        fixed="right"
        label="Operations"
        width="350"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewSection(scope.$index, getSections)"
            class="Table__view-button"
            size="small"
          >
            View
          </el-button>
          <el-button
            @click.native.prevent="showAddProductForm(scope.$index, getSections)"

            class="Table__view-button"
            size="small"
          >
            Add
          </el-button>
          <el-button
            @click.native.prevent="showEditForm(scope.$index, getSections)"

            class="Table__view-button"
            size="small"
          >
            Update
          </el-button>
          <el-button
            @click.native.prevent="deleteSection(scope.$index, getSections)"
            class="Table__view-button"
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
	import {STORE_GET_SECTIONS_REQUEST, STORE_DELETE_SECTION_REQUEST} from '../../../store/actions/store/store.sections.actions';
	import AddSectionForm from '../../../components/Dashboard/Sections/AddSectionForm';
	import EditSectionForm from '../../../components/Dashboard/Sections/EditSectionForm';
	import AddSectionProductForm from '../../../components/Dashboard/Sections/AddSectionProductForm';

	export default {
		layout: 'Dashboard/DashboardLayout',
		components: {AddSectionForm, EditSectionForm, AddSectionProductForm},

		data() {
			return {editFormVisible: this.showEditForm() || false};
		},
		computed: {
			...mapGetters(['getSections'])
		},
		methods: {
			showAddForm() {
				this.addFormVisible ? eventBus.$emit('addSectionFormVisible', false) : eventBus.$emit('addSectionFormVisible', true);
				eventBus.$on('addSectionFormVisible', payload => {
					this.addFormVisible = !payload;
				});
			},
			showAddProductForm(index, sections) {

				let data = {};
				if (sections) {

					data = {
						uuid: sections[index].uuid,
					};
				}

				this.addFormVisible ? eventBus.$emit('addSectionProductFormVisible', {data: data || null, visible: false}) : eventBus.$emit('addSectionProductFormVisible', {data: data || null, visible: true});
				eventBus.$on('addSectionProductFormVisible', payload => {
					this.addFormVisible = !payload.visible;
				});
			},
			viewSection(index, sections) {
				this.$router.push(`/dashboard/sections/${sections[index].uuid}`);
			},
			deleteSection(index, sections){
				return this.$store.dispatch(STORE_DELETE_SECTION_REQUEST, sections[index].uuid);
			},
			showEditForm(index, sections) {

				let data = {};
				if (sections) {

					data = {
						uuid: sections[index].uuid,
						name: sections[index].name,
					};
				}
				this.editFormVisible
					? eventBus.$emit('editSectionFormVisible', {data: data || null, visible: false})
					: eventBus.$emit('editSectionFormVisible', {data: data || null, visible: true});

				eventBus.$on('editSectionFormVisible', payload => {
					this.editFormVisible = !payload.visible;
				});
			}
		},
		async asyncData({store}) {
			const sections = await store.dispatch(STORE_GET_SECTIONS_REQUEST);
			store.commit(STORE_GET_SECTIONS_REQUEST, sections);
		}
	};
</script>
