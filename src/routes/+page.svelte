<script lang="ts">
	import PokemonCard from "$lib/components/PokemonCard.svelte";
	import type { PokemonsResponse } from "$lib/types.js";
	import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-svelte";

	export let data;

	let pokemons = data.results;

	let loading = false;

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
			searchValue
				? p.name.includes(searchValue.toLowerCase()) || p.id === parseInt(searchValue)
				: true
		)
		.sort((a, b) => {
			if (sort === "id") {
				return order === "asc" ? a.id - b.id : b.id - a.id;
			} else {
				return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
			}
		});

	async function fetchNewData() {
		if (loading) return;
		loading = true;
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}&limit=18`);
		const data: PokemonsResponse = await res.json();

		// add id and image to each pokemon based on URL
		data.results = data.results.map((pokemon) => {
			const id = parseInt(pokemon.url.split("/")[6]);
			return {
				...pokemon,
				id,
				imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
			};
		});

		const updatedPokemons = pokemons;
		updatedPokemons.push(...data.results);
		pokemons = updatedPokemons;

		loading = false;
	}

	function infiniteScroll() {
		if (pageEndRef) {
			const observer = new IntersectionObserver(
				(entries) => {
					const first = entries[0];
					if (first.isIntersecting && !loading) {
						fetchNewData();
					}
				},
				{ threshold: 1 }
			);
			observer.observe(pageEndRef);
		}
	}

	let pageEndRef: HTMLDivElement | null = null;
	$: {
		if (pageEndRef) {
			infiniteScroll();
		}
	}
</script>

<!-- Probably not the best idea to duplicate this from the layout,
	but navigating from a detail page back to home doesn't reset the title so yeah -->
<svelte:head>
	<title>Nate's Pokedex</title>
</svelte:head>

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
	{#if !loading}
		<div bind:this={pageEndRef} />
	{:else}
		Loading...
	{/if}
</div>
