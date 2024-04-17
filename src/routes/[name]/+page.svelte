<script lang="ts">
	import { capitalize, dmToM, formatDigits, hgToKg } from "$lib/utils";
	import { ChevronLeft, ChevronRight } from "lucide-svelte";

	export let data;

	$: pokemon = data.pokemon;

	// map types to tailwind colors, from copilot :D
	const colors = new Map([
		["normal", "bg-purple-400 border-purple-500"],
		["fire", "bg-red-300 border-red-400"],
		["water", "bg-blue-500 border-blue-600"],
		["electric", "bg-yellow-500 border-yellow-600"],
		["grass", "bg-green-500 border-green-600"],
		["ice", "bg-blue-200 border-blue-300"],
		["fighting", "bg-red-400 border-red-500"],
		["poison", "bg-purple-500 border-purple-600"],
		["ground", "bg-yellow-800 text-purple-200 border-yellow-900"],
		["flying", "bg-blue-300 border-blue-400"],
		["psychic", "bg-purple-200 border-purple-400"],
		["bug", "bg-green-200 border-green-300"],
		["rock", "bg-yellow-400 border-yellow-500"],
		["ghost", "bg-purple-800 text-purple-200 border-purple-900"],
		["dragon", "bg-blue-800 text-purple-200 border-blue-900"],
		["dark", "bg-gray-800 text-purple-200 border-gray-900"],
		["steel", "bg-gray-600 text-purple-200 border-gray-700"],
		["fairy", "bg-pink-300 border-pink-400"],
	]);
</script>

<svelte:head>
	<title>{capitalize(pokemon.name)} | Nate's Pokedex</title>
</svelte:head>

<div class="flex flex-col items-center justify-center gap-1 px-1 pb-2">
	<div class="flex w-full max-w-screen-md justify-between gap-1">
		{#if data.previous}
			<a
				class="flex h-16 w-full items-center justify-between gap-1 rounded-tl-md border-b-4 border-r-4 border-purple-500 bg-purple-400 p-1 md:gap-2 md:rounded-tl-full md:px-8"
				href={`/${data.previous.name}`}
			>
				<ChevronLeft class="text-purple-900" />
				<div class="flex w-full flex-col items-center justify-center md:flex-row md:gap-2">
					<span class="text-purple-900"
						>#{formatDigits(parseInt(data.previous.url.split("/")[6]))}</span
					>
					<span class="text-xl font-bold">{capitalize(data.previous.name)}</span>
				</div>
			</a>
		{:else}
			<div
				class="flex h-16 w-full items-center justify-between gap-1 rounded-tl-md border-b-4 border-r-4 border-purple-400 bg-purple-300 p-1 md:gap-2 md:rounded-tl-full md:px-8"
			/>
		{/if}

		{#if data.next}
			<a
				class="flex h-16 w-full items-center justify-between gap-1 rounded-tr-md border-b-4 border-r-4 border-purple-500 bg-purple-400 p-1 md:gap-2 md:rounded-tr-full md:px-8"
				href={`/${data.next.name}`}
			>
				<div class="flex w-full flex-col items-center justify-center md:flex-row md:gap-2">
					<span class="text-xl font-bold">{capitalize(data.next.name)}</span>
					<span class="text-purple-900">#{formatDigits(parseInt(data.next.url.split("/")[6]))}</span
					>
				</div>
				<ChevronRight class="text-purple-900" />
			</a>
		{:else}
			<div
				class="flex h-16 w-full items-center justify-between gap-1 rounded-tr-md border-b-4 border-r-4 border-purple-400 bg-purple-300 p-1 md:gap-2 md:rounded-tr-full md:px-8"
			/>
		{/if}
	</div>

	<div
		class="flex w-full max-w-screen-md flex-wrap gap-4 rounded-b-2xl border-b-4 border-r-4 border-purple-400 bg-purple-300 p-4 font-sans text-purple-950 md:flex-nowrap"
	>
		<div class="flex flex-col justify-between gap-2">
			<div class="flex w-full justify-between md:pr-2">
				<h2 class="text-2xl font-bold">{capitalize(pokemon.name)}</h2>
				<span class=""># <span class="text-xl font-bold">{formatDigits(pokemon.id)}</span></span>
			</div>
			<div
				class="flex h-full w-full items-center justify-center rounded-xl border-b-2 border-r-2 border-purple-400 bg-purple-200"
			>
				<img
					height={768}
					width={768}
					src={pokemon.sprites.front_default}
					alt={`Image of ${pokemon.name}`}
				/>
			</div>
		</div>
		<div class="flex w-full flex-col gap-2">
			<div class="grid grid-cols-2 gap-y-4 text-center">
				<span class="text-lg"
					><span class="text-xl font-bold">Height</span>: {dmToM(pokemon.height)} m</span
				>
				<span class="text-lg"
					><span class="text-xl font-bold">Weight</span>: {hgToKg(pokemon.weight)} kg</span
				>
				<div class="col-span-2 h-0.5 w-full bg-purple-400 bg-opacity-60" />
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="text-xl font-bold">Types</h3>
				<div class="flex flex-wrap gap-2">
					{#each pokemon.types as type}
						<span
							class={"min-w-16 rounded-md border-b-2 border-r-2 px-2 py-1 text-center " +
								colors.get(type.type.name)}>{capitalize(type.type.name)}</span
						>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="text-xl font-bold">Abilities</h3>
				<div class="flex flex-wrap gap-1">
					{#each pokemon.abilities as ability}
						<span class="rounded-md border-b-2 border-r-2 border-purple-500 bg-purple-400 px-2 py-1"
							>{capitalize(ability.ability.name)}
							{#if ability.is_hidden}
								<span class="text-xs text-purple-800"> (hidden)</span>
							{/if}
						</span>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2 pb-2">
				<h3 class="text-xl font-bold">Stats</h3>
				<!-- stats for smaller screens, vertical bar chart -->
				<div
					class="hidden h-40 w-full items-end gap-2 rounded-md border-b-2 border-r-2 border-purple-400 bg-purple-200 px-2 text-purple-950 sm:flex"
				>
					{#each pokemon.stats as stat}
						<div class="flex flex-1 flex-col items-center text-center font-mono">
							<span class="text-xs">{stat.stat.name}</span>
							<div
								class={`flex w-full items-center justify-center rounded-t border-r-2 border-purple-500 bg-purple-400`}
								style={`height: ${stat.base_stat}px`}
							>
								<span class="text-xs">{stat.base_stat}</span>
							</div>
						</div>
					{/each}
				</div>
				<!-- stats for smaller screens, horizontal bar chart -->
				<div class="flex h-full w-full flex-col gap-2 rounded-md bg-purple-200 py-2 sm:hidden">
					{#each pokemon.stats as stat}
						<div class="flex flex-1 items-center gap-0.5 text-center font-mono">
							<div
								class={`flex h-8 w-full items-center justify-center rounded-r border-b-2 border-r-2 border-purple-500 bg-purple-400`}
								style={`width: ${stat.base_stat}px`}
							>
								<span class="text-xs">{stat.base_stat}</span>
							</div>
							<span class="text-xs">{stat.stat.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="text-xl font-bold">Weaknesses</h3>
				<div class="flex flex-wrap gap-1">
					{#each pokemon.weaknesses as weakness}
						<span
							class={"min-w-16 rounded-md border-b-2 border-r-2 px-2 py-1 text-center " +
								colors.get(weakness.name)}>{capitalize(weakness.name)}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
