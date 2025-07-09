import { BASE_URL, POKEMON_URL } from '@/sources/constants';
import { baseApi } from '../axios';

export const pokemonService = {
  getPokemonsList: async () => {
    const responsePokemonsList = await baseApi.get(BASE_URL);
    const pokemonList = responsePokemonsList.data.results;

    return pokemonList;
  },

  getPokemon: async (pokemon: { name: string; url: string }) => {
    const pokemonResponse = await baseApi.get(pokemon.url);
    const pokemonUrl = pokemonResponse.data;

    const detailResponse = await baseApi.get(`${POKEMON_URL}/${pokemon.name}`);
    const pokemonImage = detailResponse;

    return { pokemonUrl, pokemonImage };
  },
};
