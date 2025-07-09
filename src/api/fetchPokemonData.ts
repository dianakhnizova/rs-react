import { preparePokemonsList } from '@/utils/preparePocemonsList';
import { pokemonService } from './services/pokemonService';

export const fetchPokemonData = async (searchTerm: string) => {
  try {
    const pokemons = await pokemonService.getPokemonsList();
    const pokemonsList = preparePokemonsList(pokemons);

    if (searchTerm) {
      return pokemonsList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return pokemonsList;
  } catch {
    console.log('error');
    return [];
  }
};
