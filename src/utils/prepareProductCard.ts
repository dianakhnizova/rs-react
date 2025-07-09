import { pokemonService } from '@/api/services/pokemonService';
import type { PokemonData } from '@/sources/types';
import { messages } from '@/sources/messages';

export const prepareProductCard = async (
  searchTerm: string
): Promise<PokemonData[]> => {
  await new Promise(res => setTimeout(res, 2000));

  const pokemons = await pokemonService.getPokemonsList();
  const searchedPokemons = pokemons.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const promises = searchedPokemons.map(
    async (pokemon: { name: string; url: string }) => {
      try {
        const { pokemonUrl, pokemonImage } =
          await pokemonService.getPokemon(pokemon);

        const id = pokemonUrl.id;
        const name =
          pokemonUrl.name.toUpperCase() || messages.notFoundDataTitle;
        const description =
          pokemonUrl.flavor_text_entries?.filter(
            (description: {
              flavor_text: string;
              language: { name: string };
            }) => description.flavor_text && description.language.name === 'en'
          ) || [];
        const image = {
          front_default: pokemonImage.data.sprites?.front_default || null,
        };

        return { id, name, description, image };
      } catch {
        console.log('error');
      }
    }
  );

  const results = await Promise.all(promises);
  return results;
};
