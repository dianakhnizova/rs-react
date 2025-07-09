import { pokemonServices } from '@/api/services/pokemonServices';
import type { PokemonData } from '@/sources/types';
import { messages } from '@/sources/messages';

export const prepareProductCard = async (): Promise<PokemonData[]> => {
  await new Promise(res => setTimeout(res, 2000));

  const pokemons = await pokemonServices.getPokemonsList();

  const promises = pokemons.map(
    async (pokemon: { name: string; url: string }) => {
      try {
        const { pokemonUrl, pokemonImage } =
          await pokemonServices.getPokemon(pokemon);

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
