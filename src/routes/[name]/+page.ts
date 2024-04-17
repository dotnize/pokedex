import type { Pokemon, PokemonPreview, PokemonsResponse, Type } from "$lib/types";

interface TypeData {
	damage_relations: {
		double_damage_from: Type[];
		double_damage_to: Type[];
		half_damage_from: Type[];
		half_damage_to: Type[];
		no_damage_from: Type[];
		no_damage_to: Type[];
	};
}

export async function load({ params }: { params: { name: string } }) {
	// TODO params validation? optimize using Promise.all?
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
	const pokemon: Pokemon = await response.json();

	const weaknesses: Type[] = [];

	for (const type of pokemon.types) {
		const typeResponse = await fetch(type.type.url);
		const typeData: TypeData = await typeResponse.json();

		weaknesses.push(
			...typeData.damage_relations.double_damage_from,
			...typeData.damage_relations.no_damage_to
		);
	}

	// use Set to remove duplicates
	pokemon.weaknesses = Array.from(new Set(weaknesses.map((w) => JSON.stringify(w)))).map((w) =>
		JSON.parse(w)
	);

	// get next and previous pokemons, if any
	const listResponse = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=3&offset=${Math.max(pokemon.id - 2, 0)}`
	);

	const listData: PokemonsResponse = await listResponse.json();

	let next: PokemonPreview | null = null;

	// don't show next results for the last pokemon
	if (pokemon.id < 1025) {
		next =
			listData.results[0]?.name === params.name ? listData.results[1] : listData.results[2] || null;
	}
	const previous: PokemonPreview | null =
		listData.results[0]?.name !== params.name ? listData.results[0] || null : null;

	return { pokemon, next, previous };
}
