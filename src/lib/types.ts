// shared types

export interface PokemonsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonPreview[];
}
export interface PokemonPreview {
	id: number;
	url: string;
	name: string;
	imageUrl: string;
}

// the api response probably contains more fields, but i only added the ones needed to display
export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: {
		slot: number;
		type: Type;
	}[];
	abilities: {
		slot: number;
		is_hidden: boolean;
		ability: { name: string; url: string };
	}[];
	stats: {
		base_stat: number;
		effort: number;
		stat: { name: string; url: string };
	}[];
	sprites: {
		front_default: string;
		front_shiny: string;
		back_default: string;
		back_shiny: string;
		front_female: string | null;
		front_shiny_female: string | null;
		back_female: string | null;
		back_shiny_female: string | null;
	};
	weaknesses: Type[];
}

export interface Type {
	name: string;
	url: string;
}
