<script lang="ts">
	import PokemonCard from "$lib/components/PokemonCard.svelte";
	import ScrollTop from "$lib/components/ScrollTop.svelte";
	import type { PokemonsResponse } from "$lib/types.js";
	import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ, LoaderCircle } from "lucide-svelte";

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
		// no infinite scroll if search results are too low, to avoid fetching too much
		if (loading || filteredPokemons.length < 12) return;
		loading = true;

		// reset sort & order
		sort = "id";
		order = "asc";

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

<ScrollTop />
<div class="flex flex-col items-center justify-center gap-4 px-4 py-8">
	<div class="flex w-full max-w-screen-md flex-col items-center justify-between gap-4 sm:flex-row">
		<input
			bind:value={searchValue}
			type="text"
			placeholder="Search by ID or name..."
			class="h-12 w-full rounded border-2 bg-purple-50 p-2 text-purple-950 outline-none ring-1 ring-purple-300 focus:ring-2 focus:ring-purple-400 sm:max-w-sm"
		/>
		<div class="flex w-full items-center justify-end gap-2">
			Sort by:
			<button
				class="flex h-12 items-center rounded-md border-2 border-purple-300 font-bold text-black transition hover:border-purple-500"
				on:click={toggleSort}
			>
				<div
					class={"flex h-full w-16 items-center justify-center rounded-l p-1" +
						(sort === "id" ? " bg-purple-400" : "")}
				>
					ID
				</div>
				<div
					class={"flex h-full w-16 items-center justify-center rounded-r p-1" +
						(sort === "name" ? " bg-purple-400" : "")}
				>
					Name
				</div>
			</button>
			<button
				class="flex h-12 w-12 items-center justify-center rounded-md border-2 border-transparent bg-purple-400 p-1 text-purple-950 transition hover:border-purple-500"
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
		<LoaderCircle class="animate-spin text-purple-900" size={28} />
	{/if}
</div>
