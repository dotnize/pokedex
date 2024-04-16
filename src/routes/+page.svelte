<script lang="ts">
	import PokemonCard from "$lib/components/PokemonCard.svelte";
	import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-svelte";

	export let data;

	const pokemons = data.results;

	let sort: "id" | "name" = "id";
	let order: "asc" | "desc" = "asc";

	let searchValue = "";

	function toggleSort() {
		sort = sort === "id" ? "name" : "id";
	}
	function toggleOrder() {
		order = order === "asc" ? "desc" : "asc";
	}

	// filtered by search and sorted
	$: filteredPokemons = pokemons
		.filter((p) =>
			searchValue ? p.name.includes(searchValue) || p.id === parseInt(searchValue) : true
		)
		.sort((a, b) => {
			if (sort === "id") {
				return order === "asc" ? a.id - b.id : b.id - a.id;
			} else {
				return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
			}
		});
</script>

<div class="flex flex-col items-center justify-center gap-4 px-4 py-8">
	<div class="flex w-full max-w-screen-md flex-col items-center justify-between gap-4 sm:flex-row">
		<input
			bind:value={searchValue}
			type="text"
			placeholder="Search..."
			class="w-full rounded-md border-2 p-2 sm:max-w-sm"
		/>
		<div class="flex w-full items-center justify-end gap-2">
			Sort by:
			<button
				class="flex rounded-md border-2 transition hover:border-blue-300"
				on:click={toggleSort}
			>
				<div class={"w-16 rounded-l-md p-1" + (sort === "id" ? " bg-blue-300" : "")}>ID</div>
				<div class={"w-16 rounded-r-md p-1" + (sort === "name" ? " bg-blue-300" : "")}>Name</div>
			</button>
			<button
				class="rounded-md border-2 p-1 transition hover:border-blue-300"
				on:click={toggleOrder}
			>
				{#if sort === "id"}
					{#if order === "asc"}
						<ArrowDown01 />
					{:else}
						<ArrowUp01 />
					{/if}
				{:else if order === "asc"}
					<ArrowDownAZ />
				{:else}
					<ArrowUpAZ />
				{/if}
			</button>
		</div>
	</div>
	<div class="grid w-full max-w-screen-md gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredPokemons as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</div>
</div>
