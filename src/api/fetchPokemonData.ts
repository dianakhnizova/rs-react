import type { PokemonData } from '@/sources/types';
import axios from 'axios';
import { messages } from '../sources/messages';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

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
        const data = pokemonResponse.data;

        const detailResponse = await axios.get(
          `${POKEMON_URL}/${pokemon.name}`
        );
        const pokemonData = detailResponse.data;

        const id = data.id;
        const name = data.name || messages.notFoundDataTitle;
        const description =
          data.flavor_text_entries?.filter(
            (description: { flavor_text: string }) => description.flavor_text
          ) || [];
        const image = {
          front_default: pokemonData.sprites?.front_default || null,
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
