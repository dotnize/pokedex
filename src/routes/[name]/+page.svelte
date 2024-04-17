<script lang="ts">
	import { capitalize, dmToM, hgToKg } from "$lib/utils";
	import { fade, slide } from "svelte/transition";

	export let data;

	$: pokemon = data.pokemon;

	// map types to tailwind colors, from copilot :D
	const colors = new Map([
		["fire", "bg-red-500"],
		["water", "bg-blue-500"],
		["electric", "bg-yellow-500"],
		["grass", "bg-green-500"],
		["ice", "bg-blue-200"],
		["fighting", "bg-red-800"],
		["poison", "bg-purple-500"],
		["ground", "bg-yellow-800"],
		["flying", "bg-blue-300"],
		["psychic", "bg-purple-200"],
		["bug", "bg-green-200"],
		["rock", "bg-yellow-400"],
		["ghost", "bg-purple-800"],
		["dragon", "bg-blue-800"],
		["dark", "bg-gray-800"],
		["steel", "bg-gray-500"],
		["fairy", "bg-pink-300"],
	]);
</script>

<svelte:head>
	<title>{capitalize(pokemon.name)} | Nate's Pokedex</title>
</svelte:head>

{#key pokemon}
	<div
		class="absolute left-0 right-0 mx-auto flex justify-center"
		in:slide={{ axis: "x" }}
		out:fade
	>
		{#if data.previous}
			<a href={`/${data.previous?.name}`}>Back</a>
		{/if}
		<div
			class="flex w-full max-w-screen-md flex-wrap gap-4 rounded-2xl bg-blue-200 p-4 md:flex-nowrap"
		>
			<div class="flex flex-col gap-2">
				<h2 class="text-2xl font-bold">{capitalize(pokemon.name)}</h2>
				<img
					class="rounded-2xl bg-white"
					height={768}
					width={768}
					src={pokemon.sprites.front_default}
					alt={`Image of ${pokemon.name}`}
				/>
			</div>
			<div class="flex w-full flex-col gap-2">
				<div class="grid grid-cols-2">
					<span>Height: {dmToM(pokemon.height)}m</span>
					<span>Weight: {hgToKg(pokemon.weight)}kg</span>
					<div class="flex flex-col gap-2">
						<h3 class="text-xl font-bold">Types</h3>
						<div class="flex flex-wrap gap-2">
							{#each pokemon.types as type}
								<span class={"rounded-md px-2 py-1 " + colors.get(type.type.name)}
									>{capitalize(type.type.name)}</span
								>
							{/each}
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<h3 class="text-xl font-bold">Abilities</h3>
						{#each pokemon.abilities as ability}
							<span
								>{capitalize(ability.ability.name)}
								{#if ability.is_hidden}
									<span class="text-xs text-gray-500"> (hidden)</span>
								{/if}
							</span>
						{/each}
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-xl font-bold">Stats</h3>
					<div class="flex w-full items-end gap-2 rounded-lg bg-white px-2">
						{#each pokemon.stats as stat}
							<div class="flex flex-1 flex-col items-center text-center font-mono">
								<span class="text-xs">{stat.stat.name}</span>
								<div
									class={`flex w-full justify-center rounded-t bg-blue-500 p-2`}
									style={`height: ${stat.base_stat}px`}
								>
									<span class="text-xs">{stat.base_stat}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<h3 class="text-xl font-bold">Weaknesses</h3>
					<div class="flex flex-wrap gap-2">
						{#each pokemon.weaknesses as weakness}
							<span class={"rounded-md px-2 py-1 " + colors.get(weakness.name)}
								>{capitalize(weakness.name)}</span
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if data.next}
			<a href={`/${data.next.name}`}>Next</a>
		{/if}
	</div>
{/key}
