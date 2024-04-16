import type { Pokemon } from "$lib/types";

interface PokemonsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
}

export async function load() {
	// TODO: pagination
	const response = await fetch("https://pokeapi.co/api/v2/pokemon");
	const data: PokemonsResponse = await response.json();

	// add id and image to each pokemon based on URL
	// much more efficient than fetching for each pokemon, we can just get images from PokeAPI's repo
	data.results = data.results.map((pokemon) => {
		const id = parseInt(pokemon.url.split("/")[6]);
		return {
			...pokemon,
			id,
			imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
		};
	});

	return data;
}
