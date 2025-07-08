import { Component } from 'react';
import styles from './ResultSection.module.scss';
import { messages } from './messages';
import { fetchPokemonData } from '@/api/fetchPokemonData';
import type { PokemonData } from '@/sources/types';

export class ResultSection extends Component {
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
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <p className={styles.titleName}>{messages.titleName}</p>
          <p className={styles.titleDescription}>{messages.titleDescription}</p>
          <p className={styles.titleImage}>{messages.titleImage}</p>
        </div>

        <div className={styles.gridDivider}></div>

        <div className={styles.pokemonsContainer}>
          {pokemons.length === 0 && <p>{messages.emptyList}</p>}
          {pokemons.map((pokemon: PokemonData) => (
            <div className={styles.pokemon}>
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
                  src={pokemon.image?.front_default || messages.notImgTitle}
                  alt={pokemon.name}
                  className={styles.img}
                />
              </div>
            </div>
          ))}
        </div>

        <button className={styles.button}>{messages.errorButton}</button>
      </div>
    );
  }
}
