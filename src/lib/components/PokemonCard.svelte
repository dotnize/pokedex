<script lang="ts">
	import type { PokemonPreview } from "$lib/types";
	import { capitalize, formatDigits } from "$lib/utils";

	export let pokemon: PokemonPreview;
</script>

<a
	href={`/details/${pokemon.id}`}
	class="flex flex-col items-center rounded-lg border-2 p-4 transition hover:scale-[1.02]"
>
	<img height={144} width={144} src={pokemon.imageUrl} alt={`Picture of ${pokemon.name}`} />
	<span class="text-gray-500">{formatDigits(pokemon.id)}</span>
	{capitalize(pokemon.name)}
</a>
