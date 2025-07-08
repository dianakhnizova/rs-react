import type { PokemonData } from '@/sources/types';
import axios from 'axios';
import { messages } from '../sources/messages';
import { BASE_URL, POKEMON_URL } from '@/sources/constants';

export const fetchPokemonData = async (
  setPokemon: (pokemons: PokemonData[]) => void
) => {
  try {
    const response = await axios.get(BASE_URL);
    const pokemons = response.data.results;
    const pokemonsList: PokemonData[] = [];

    for (const pokemon of pokemons) {
      try {
        const pokemonResponse = await axios.get(pokemon.url);
        const detailResponse = await axios.get(
          `${POKEMON_URL}/${pokemon.name}`
        );

        const pokemonData1 = pokemonResponse.data;
        const pokemonData2 = detailResponse.data;

        const id = pokemonData1.id;
        const name = pokemonData1.name || messages.notFoundDataTitle;
        const description =
          pokemonData1.flavor_text_entries?.filter(
            (description: {
              flavor_text: string;
              language: { name: string };
            }) => description.flavor_text && description.language.name === 'en'
          ) || [];
        const image = {
          front_default: pokemonData2.sprites?.front_default || null,
        };

        pokemonsList.push({ id, name, description, image });
      } catch {
        console.log('error');
      }
    }

    setPokemon(pokemonsList);
  } catch {
    console.log('error');
  }
};
