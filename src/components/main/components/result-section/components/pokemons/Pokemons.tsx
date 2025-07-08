import { Component } from 'react';
import styles from './Pokemons.module.scss';
import { fetchPokemonData } from '@/api/fetchPokemonData';
import type { PokemonData } from '@/sources/types';
import { messages } from './messages';

export class Pokemons extends Component {
  public state = {
    pokemons: [],
  };

  public componentDidMount(): void {
    void fetchPokemonData((pokemons: PokemonData[]) => {
      this.setState({ pokemons });
    });
  }

  public render() {
    const { pokemons } = this.state;

    return (
      <div className={styles.pokemonsContainer}>
        {pokemons.length === 0 && <p>{messages.emptyList}</p>}
        {pokemons.map((pokemon: PokemonData) => (
          <div key={pokemon.id} className={styles.pokemon}>
            <div className={styles.name}>
              <p>{pokemon.name}</p>
            </div>
            <div className={styles.description}>
              <p>
                {pokemon.description[0]?.flavor_text ||
                  messages.titleNotDescription}
              </p>
            </div>
            <div className={styles.image}>
              <img
                src={pokemon.image?.front_default || messages.titleNotImg}
                alt={pokemon.name}
                className={styles.img}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
