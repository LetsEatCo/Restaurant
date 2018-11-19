<template>
  <el-container>
    <el-header 
      height="auto" 
      style="background-color: white;"
    >
      <div class="Header">
        <div class="Header__left">
          <img 
            class="Header__left__logo"
            src="https://s3.eu-west-3.amazonaws.com/lets-eat-co/assets/Logo--Black--no-fork.svg"
          >
        </div>
        <div class="Header__right">
          <nuxt-link 
            v-if="!isAuthenticated" 
            to="/login" 
            class="Header__right__login"
          >Login</nuxt-link>
          <nuxt-link 
            v-if="isAuthenticated" 
            to="/dashboard" 
            class="Header__right__login"
          >Dashboard</nuxt-link>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="Main">
        <nuxt />
      </div>
    </el-main>
    <el-footer height="auto">
      <div class="Footer">
        <div class="Footer__top">
          <p class="Footer__top__heading-text">Let's Eat is the largest, most reliable on-demand delivery and pickup
          platform.</p>
          <p class="Footer__top__sub-text">Able to deliver anything from anywhere, Let's Eat is the food delivery,
          grocery delivery, whatever-you-can-think-of delivery service to bring what you crave right to your door.</p>
        </div>
        <div class="Footer__bottom">
          <div class="Footer__bottom--column-1">
            <img 
              class="Footer__bottom--column-1__logo"
              src="https://s3.eu-west-3.amazonaws.com/lets-eat-co/assets/Logo--White--no-fork.svg"
            >
          </div>
          <div class="Footer__bottom--column-1" />
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: 'HomepageLayout',
		computed: {
			...mapGetters(['isAuthenticated']),
		}
	};
</script>

<style lang="scss" scoped>

	body {
		font-family: LetsEatStd, Helvetica Neue, Helvetica, sans-serif;
	}

	.el-container {
		height: auto;
	}

	.el-main {
		padding: 0;
		.Main {
			width: 100%;
			max-width: 1420px;
			margin: auto;
			display: flex;
		}
	}

	.el-header {
		height: 120px;
		background-color: white;
		.Header {
			max-width: 1420px;
			margin: auto;
			width: 100%;
			display: flex;
			justify-content: space-between;
			&__left {
				display: flex;
				align-content: center;
				&__logo {
					width: 140px;
				}
			}

			&__right {
				display: flex;
				align-content: center;
				align-items: center;
				&__login {
					text-decoration: none;
					color: black;
					text-transform: uppercase;
					font-weight: 500;
					letter-spacing: 1px;
					font-size: 14px;
				}
			}
		}
	}

	.el-footer {
		background-color: black;
		padding: 0 60px;
		.Footer {
			margin: auto;
			max-width: 1024px;
			width: 100%;
			&__top {
				padding-top: 72px;
				padding-bottom: 56px;
				border-bottom: 1px solid rgba(255, 255, 255, 0.25);
				&__heading-text {
					font-size: 14px;
					color: rgba(255, 255, 255, 0.9);
				}
				&__sub-text {
					font-size: 11px;
					color: rgba(255, 255, 255, 0.6);
				}
			}
			&__bottom {
				display: flex;
				flex-flow: row wrap;
				padding-top: 96px;
				padding-bottom: 163px;
				&--column-1 {
					flex: 1 0 calc(100% / 2 + 50px);

					&__logo {
						width: 140px;
					}
				}
			}
		}
	}
</style>
