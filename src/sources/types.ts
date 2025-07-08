type FlavorTextEntries = {
  flavor_text: string;
};

export type PokemonData = {
  id: number;
  name: string;
  description: FlavorTextEntries[];
  image: { front_default: string | null };
};
