<script lang="ts">
	import type { PokemonPreview } from "$lib/types";
	import { capitalize, formatDigits } from "$lib/utils";

	export let pokemon: PokemonPreview;
</script>

<a
	href={`/${pokemon.name}`}
	class="flex flex-col items-center rounded-md border-b-4 border-r-4 border-purple-400 bg-purple-300 p-4 transition duration-200 hover:-rotate-2"
>
	<img height={144} width={144} src={pokemon.imageUrl} alt={`Picture of ${pokemon.name}`} />
	<span class="text-gray-500">{formatDigits(pokemon.id)}</span>
	{capitalize(pokemon.name)}
</a>
