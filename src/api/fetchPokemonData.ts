import { prepareProductCard } from '@/utils/prepareProductCard';

export const fetchPokemonData = async (searchTerm: string) => {
  try {
    const pokemonsLst = await prepareProductCard(searchTerm);
    return pokemonsLst;
  } catch {
    console.log('error');
  }
};
