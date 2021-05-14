<template>
 	<v-card>
		<v-card-text>
			{{ animais.length }} animais registrados no sistema
		</v-card-text>
		<v-spacer />
		<v-card-text>
    		JSON: {{ animais }}
		</v-card-text>
 	</v-card>
</template>

<script>
export default {
	async asyncData ({ $axios }) {
		const animais = await $axios.$get('/api/animais');
		return {
			animais
		};
	}
};
</script>