<template>
	<div>
		<div class="Title">
			<h1>Ingredients</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add" size="medium">Add</el-button>
		</div>
		<el-table
			ref="multipleTable"
			:data="ingredientsDataTable"
			stripe
			style="width: 100%">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				v-if="false"
				property="uuid"
				label="UUID">
			</el-table-column>
			<el-table-column
				property="name"
				label="Name">
			</el-table-column>
			<el-table-column
				property="quantity"
				label="Quantity">
			</el-table-column>
		</el-table>
	</div>
</template>

<style lang="scss" scoped>
	.Title {
		margin: 60px 0 0 0;
		position: relative;
		min-height: 80px;
		h1 {
			font-weight: 600;
			margin: 0;
			font-size: 36px;
		}
		/deep/ &:after {
			position: absolute;
			content: '';
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			width: 100%;
			transform: translateX(-50%);
			bottom: 0;
			left: 50%;
		}
	}

	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	.main-container {
		height: 100vh;
		overflow-y: scroll;
	}
	.Actions {
		display: flex;
		align-items: center;
		min-height: 70px;
		position: relative;
		margin-bottom: 40px;
		/deep/ &:after {
			position: absolute;
			content: '';
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			width: 100%;
			transform: translateX(-50%);
			bottom: 0;
			left: 50%;
		}
		&__add {
			display: flex;
			margin-left: auto;
			background-color: black;
			color: #FFF;
			border: none;
		}
	}
</style>

<script>
	import {
		STORE_GET_INGREDIENTS_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.ingredients.actions';
	import {mapGetters} from 'vuex';

	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
		},
		computed: {
			...mapGetters(['getIngredients'])
		},
		async asyncData({store}) {
			if (!store.getters.getIngredients.length > 0) {
				const ingredients = await store.dispatch(STORE_GET_INGREDIENTS_REQUEST);
				store.commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, ingredients.data);
				return {ingredientsDataTable: ingredients.data};
			}
			return {ingredientsDataTable: store.getters.getIngredients};
		}
	};
</script>
