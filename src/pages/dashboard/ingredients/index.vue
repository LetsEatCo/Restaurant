<template>
	<div>
		<div class="Title">
			<h1>Ingredients</h1>
		</div>
		<div class="Actions">
			<el-button class="Actions__add-button" size="medium" @click="addFormVisible = true">Add</el-button>
			<el-dialog title="Add Ingredient" custom-class="Actions__add-dialog" :visible.sync="addFormVisible" top="30vh"
								 width="35%">
				<el-form ref="form" :model="form">
					<el-form-item label="Ingredient Name">
						<el-input placeholder="Eg. Salad" v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="Quantity">
						<el-input placeholder="Ingredient quantity available in your stock" v-model="form.quantity"
											autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer">
					<el-button class="cancel-button"
										 @click="addFormVisible = false">Cancel
					</el-button>
					<el-button class="add-button" @click="addIngredient">Add Ingredient</el-button>
				</div>
			</el-dialog>
		</div>
		<el-table
			ref="multipleTable"
			:data="this.getIngredients"
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
		&__add-button {
			display: flex;
			margin-left: auto;
			background-color: black;
			color: #FFF;
			border: none;
			border-radius: 0;
			text-transform: uppercase;
			font-size: 12px;
		}
	}
</style>

<style lang="scss">
	.Actions__add-dialog {
		position: absolute;
		left: calc(50% + 12.5% - (3% * 2));
		transform: translateX(-50%);
		border-radius: 0;
		.el-dialog {
			&__header {
				position: relative;
				padding: 30px 40px 30px;
				&:after {
					position: absolute;
					content: '';
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					width: 100%;
					transform: translateX(-50%);
					bottom: 0;
					left: 50%;
				}
			}
			&__body {
				padding: 30px 40px;
				.el-form-item__label {
					color: black;
				}
			}
			&__title {
				font-size: 24px;
				color: black;
				font-weight: 500;
			}
			&__footer {
				padding: 10px 40px 20px;
			}
			&__close {
				color: black;
				&:hover {
					color: black;
				}
			}
		}

		.el-button {
			&.add-button {
				color: white;
				background-color: black;
				border: none;
				border-radius: 0;
				text-transform: uppercase;
				font-size: 12px;
			}
			&.cancel-button {
				color: black;
				background-color: white;
				border: 1px solid rgba(0, 0, 0, 0.2);
				border-radius: 0;
				text-transform: uppercase;
				font-size: 12px;
			}
		}
		.el-input {
			input {
				border-radius: 0;
				&:focus {
					border-color: black;
				}
			}
		}
	}
</style>

<script>
	import {
		STORE_CREATE_INGREDIENT_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST,
		STORE_GET_INGREDIENTS_REQUEST_SUCCESS
	} from '../../../store/actions/store/store.ingredients.actions';
	import {mapGetters} from 'vuex';

	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
			return {
				addFormVisible: false,
				form: {
					name: '',
					quantity: ''
				}
			};
		},
		computed: {
			...mapGetters(['getIngredients'])
		},
		methods: {
			addIngredient() {
				const data = {
					name: this.form.name,
					quantity: parseInt(this.form.quantity)
				};
				return this.$store.dispatch(STORE_CREATE_INGREDIENT_REQUEST, data);
			}
		},
		async asyncData({store}) {
			const ingredients = await store.dispatch(STORE_GET_INGREDIENTS_REQUEST);
			store.commit(STORE_GET_INGREDIENTS_REQUEST_SUCCESS, ingredients);
		}
	};
</script>
