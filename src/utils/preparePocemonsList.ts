import type { PokemonData } from '@/sources/types';
import { messages } from '@/sources/messages';

export const preparePokemonsList = (
  pokemonList: PokemonData[]
): PokemonData[] => {
  const pokemons = pokemonList.map(pokemon => {
    const id = pokemon.id;
    const name = pokemon.name.toUpperCase() || messages.notFoundDataTitle;
    const description =
      pokemon.description.filter(
        (description: { flavor_text: string; language: { name: string } }) =>
          description.flavor_text && description.language.name === 'en'
      ) || [];
    const image = pokemon.image;

    return {
      id,
      name,
      description,
      image,
    };
  });

  return pokemons;
};
