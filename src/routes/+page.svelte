<script lang="ts">
	import PokemonCard from "$lib/components/PokemonCard.svelte";

	export let data;

	const pokemons = data.results;
</script>

<div class="flex flex-col items-center justify-center gap-4 px-4 py-8">
	<div class="flex w-full max-w-screen-md flex-col items-center justify-between gap-4 sm:flex-row">
		<input type="text" placeholder="Search..." class="w-full rounded-md border-2 p-2 sm:max-w-sm" />
		<div class="flex w-full items-center justify-end gap-1">
			Sort by:
			<div class="flex">
				<button class="w-16 rounded-l-md border-2 border-r-0 bg-blue-400 p-1 transition">ID</button>
				<button class="w-16 rounded-r-md border-2 border-l-0 p-1 transition hover:bg-blue-200"
					>Name</button
				>
			</div>
			<button class="rounded-md border p-1">asc/desc icon</button>
		</div>
	</div>
	<div class="grid w-full max-w-screen-md gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each pokemons as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</div>
</div>
