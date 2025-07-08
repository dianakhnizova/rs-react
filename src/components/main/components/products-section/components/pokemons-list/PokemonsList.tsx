import { Component } from 'react';
import styles from './PokemonsList.module.scss';
import { fetchPokemonData } from '@/api/fetchPokemonData';
import { messages } from './messages';
import { PokemonsCards } from '../pokemons-cards/PokemonsCards';

export class PokemonsList extends Component {
  public state = {
    pokemons: [],
  };

  public async loadPokemons() {
    try {
      const pokemons = await fetchPokemonData();
      this.setState({ pokemons });
    } catch (error) {
      console.error('Ошибка загрузки покемонов', error);
    }
  }

  public componentDidMount(): void {
    void this.loadPokemons();
  }

  public render() {
    const { pokemons } = this.state;

    return (
      <ul className={styles.pokemonsContainer}>
        {pokemons.length === 0 && <p>{messages.emptyList}</p>}
        <PokemonsCards pokemons={pokemons} />
      </ul>
    );
  }
}
