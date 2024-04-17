import type { PokemonsResponse } from "$lib/types";

export async function load() {
	// TODO: pagination
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=18");
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
