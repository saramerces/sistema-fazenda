<template>
 	<v-card>
		<v-card-text>
			{{ vacinas.length }} vacinas registradas no sistema
		</v-card-text>
		<v-spacer />
		<v-card-text>
    		JSON: {{ vacinas }}
		</v-card-text>
 	</v-card>
</template>

<script>
export default {
	async asyncData ({ $axios }) {
		const vacinas = await $axios.$get('/api/vacinas');
		return {
			vacinas
		};
	}
};
</script>