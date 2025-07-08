import { Component } from 'react';
import styles from './PokemonsCards.module.scss';
import type { PokemonData } from '@/sources/types';
import { messages } from './messages';

interface Props {
  pokemons: PokemonData[];
}

export class PokemonsCards extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { pokemons } = this.props;

    return (
      <>
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
                src={pokemon.image?.front_default || ''}
                alt={pokemon.name}
                className={styles.img}
              />
            </div>
          </div>
        ))}
      </>
    );
  }
}
