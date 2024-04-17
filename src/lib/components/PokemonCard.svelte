<script lang="ts">
	import type { PokemonPreview } from "$lib/types";
	import { capitalize, formatDigits } from "$lib/utils";

	export let pokemon: PokemonPreview;
</script>

<a
	href={`/${pokemon.name}`}
	class="relative flex flex-col items-center rounded-md border-b-4 border-r-4 border-purple-400 bg-purple-300 p-4 transition duration-200 hover:-rotate-2"
>
	<img height={144} width={144} src={pokemon.imageUrl} alt={`Image of ${pokemon.name}`} />
	<span
		class="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-purple-400 bg-opacity-70 p-2 text-purple-900"
		>#<span class="font-bold text-purple-950">{formatDigits(pokemon.id)}</span></span
	>
	<span class="text-xl font-bold text-purple-950">{capitalize(pokemon.name)}</span>
</a>
