<template>
	<div class="Home">
		<div class="Hero__Content">
			<h1 class="Hero__Content__title" :class="$mq">The fast way to <br/>
				get food to your customers</h1>
			<div class="Hero__Content__form" :class="$mq">
				<RegisterForm/>
			</div>
		</div>
	<div class="Hero__Image">

	</div>
	</div>
</template>

<script>
	import RegisterForm from '../components/Home/RegisterForm';

	export default {
		layout: 'HomepageLayout',
		components: {RegisterForm}
	};
</script>

<style lang="scss" scoped>

	.Home {
		width: 100%;
	}

	.Hero__Content {
		height: 320px;
		padding: 60px 120px;
		position: relative;

		&__title {
			font-weight: 600;
			font-size: 52px;
			line-height: 1;
			margin: 0;
			&.md {
				max-width: 640px;
			}
		}

		&__form {
			position: absolute;
			min-width: 420px;
			background-color: #F1F1F1;
			padding: 20px 40px;
			right: 0;
			top: 60px;
			border-top: 10px solid #999999;
			&.md, &.sm {
				margin-top: 40px;
				top: auto;
			}
		}
	}

	.Hero__Image {
		background-size: cover;
		height: 680px;
		background: url("https://s3.eu-west-3.amazonaws.com/lets-eat-co/assets/Restaurants/HeroImage-1.jpg") no-repeat 50% 50%;

	}
</style>
