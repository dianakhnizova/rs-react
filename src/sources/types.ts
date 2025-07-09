export type FlavorTextEntries = {
  flavor_text: string;
  language: { name: string };
};

export type PokemonData = {
  id: number;
  name: string;
  description: FlavorTextEntries[];
  image: string;
};
