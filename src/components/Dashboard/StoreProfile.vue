<template>
	<div class="infos-container">
		<ul>
			<li>Name : {{getProfile.name}}</li>
			<li>Email : {{getProfile.email}}</li>
			<li>Phone-number : {{getProfile.phoneNumber}}</li>
		</ul>
	</div>
</template>

<script>
	export default {

		name: 'StoreProfile',
		computed: {

			getProfile() {
				return this.$store.getters.getProfile;
			}
		}
	};
</script>

<style scoped>

</style>
