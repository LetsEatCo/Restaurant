<template>
	<div class="app-wrapper">
		<Sidebar class="sidebar-container"/>
		<el-container>
			<el-col :span="24" class="main-container">
				<no-ssr>
					<nuxt/>
				</no-ssr>
			</el-col>
		</el-container>
	</div>
</template>

<script>
	import {Sidebar} from './components';

	export default {
		name: 'Layout',
		components: {
			Sidebar
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.el-container {
		padding: 0 3%;
		height: 100vh;
		overflow: scroll;
	}
</style>

<style rel="stylesheet/scss" lang="scss">
	.Title {
		margin: 60px 0 0 0;
		position: relative;
		min-height: 80px;
		h1 {
			font-weight: 600;
			margin: 0;
			font-size: 36px;
		}
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

	.Actions {
		display: flex;
		align-items: center;
		min-height: 70px;
		position: relative;
		margin-bottom: 40px;
		&:after {
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

	.Actions__add-dialog, .Actions__edit-dialog {
		position: absolute;
		left: 50%;
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

	.Table {
		table {
			thead {
				color: rgba(0, 0, 0, 0.8);
			}

			tbody {
				tr.hover-row > td {
					background-color: rgba(0, 0, 0, 0.1);
				}
				tr {
					color: rgba(0, 0, 0, 0.7);
				}
			}
		}
		&__delete-button {
			border-radius: 0;
			color: black;
			background-color: white;
			text-transform: uppercase;
			font-size: 10px;
			&:hover {
				color: black;
				background-color: white;
				border: 1px solid rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>
