import { BASE_URL, POKEMON_URL } from '@/sources/constants';
import { baseApi } from '../axios';
import type { PokemonData, FlavorTextEntries } from '@/sources/types';
import type {
  IPokemonResponse,
  IPokemonDescriptionResponse,
  IPokemonListResponse,
} from '@/sources/interfaces';
import type { AxiosResponse } from 'axios';

export const pokemonService = {
  getPokemonDescription: async (id: number): Promise<FlavorTextEntries[]> => {
    try {
      const response: AxiosResponse<IPokemonDescriptionResponse> =
        await baseApi.get(`${BASE_URL}/${id}`);
      return response.data.flavor_text_entries || [];
    } catch {
      console.log('error');
      return [];
    }
  },

  getPokemonData: async (pokemon: {
    name: string;
    url: string;
  }): Promise<PokemonData> => {
    try {
      const pokemonResponse: AxiosResponse<IPokemonResponse> =
        await baseApi.get(pokemon.url);
      const pokemonData: IPokemonResponse = pokemonResponse.data;
      const description = await pokemonService.getPokemonDescription(
        pokemonData.id
      );

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        description,
        image: pokemonData.sprites.front_default || '',
      };
    } catch {
      console.log(`error`);
      return {
        id: 0,
        name: pokemon.name,
        description: [],
        image: '',
      };
    }
  },

  getPokemonsList: async (): Promise<PokemonData[]> => {
    try {
      const responsePokemonsList: AxiosResponse<IPokemonListResponse> =
        await baseApi.get(POKEMON_URL);
      const pokemonResults: { name: string; url: string }[] =
        responsePokemonsList.data.results;

      const result = pokemonResults.map(pokemonService.getPokemonData);

      const pokemonList: PokemonData[] = await Promise.all(result);

      return pokemonList;
    } catch {
      console.log('error');
      return [];
    }
  },
};
