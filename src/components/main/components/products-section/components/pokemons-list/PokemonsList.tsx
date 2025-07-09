import { Component } from 'react';
import styles from './PokemonsList.module.scss';
import { fetchPokemonData } from '@/api/fetchPokemonData';
import { messages } from './messages';
import { PokemonsCards } from '../pokemons-cards/PokemonsCards';

interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
}

export class PokemonsList extends Component<Props> {
  public state = {
    pokemons: [],
  };

  public async loadPokemons() {
    console.log('Загрузка покемонов по запросу:', this.props.searchTerm);

    this.props.setLoading(true);

    try {
      const pokemons = await fetchPokemonData(this.props.searchTerm);
      this.setState({ pokemons });
    } catch {
      console.log('error');
    } finally {
      this.props.setLoading(false);
    }
  }

  public componentDidMount(): void {
    void this.loadPokemons();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      void this.loadPokemons();
    }
  }

  public render() {
    const { pokemons } = this.state;

    return (
      <>
        {pokemons.length === 0 ? (
          <p className={styles.title}>{messages.emptyList}</p>
        ) : (
          <ul className={styles.pokemonsContainer}>
            <PokemonsCards pokemons={pokemons} />
          </ul>
        )}
      </>
    );
  }
}
