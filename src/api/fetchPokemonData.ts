import { prepareProductCard } from '@/utils/prepareProductCard';

export const fetchPokemonData = async () => {
  try {
    const pokemonsLst = await prepareProductCard();
    return pokemonsLst;
  } catch {
    console.log('error');
  }
};
