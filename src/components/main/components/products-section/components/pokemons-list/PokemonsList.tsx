import { Component } from 'react';
import styles from './PokemonsList.module.scss';
import { fetchPokemonData } from '@/api/fetchPokemonData';
import { messages } from './messages';
import { PokemonsCards } from '../pokemons-cards/PokemonsCards';
import { Spinner } from '@/components/spinner/Spinner';
import { Popup } from '@/components/popup/Popup';

interface Props {
  searchTerm: string;
}

export class PokemonsList extends Component<Props> {
  public state = {
    pokemons: [],
    isLoading: false,
  };

  public async loadPokemons() {
    this.setState({ isLoading: true });

    try {
      const pokemons = await fetchPokemonData(this.props.searchTerm);
      this.setState({ pokemons });
    } catch (error) {
      console.error('Ошибка загрузки покемонов', error);
    } finally {
      this.setState({ isLoading: false });
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

  public onClose = () => {
    this.setState({ isLoading: false });
  };

  public render() {
    const { pokemons, isLoading } = this.state;

    return (
      <>
        <Popup isLoading={isLoading} onClose={this.onClose}>
          <Spinner isLoading={isLoading} />
        </Popup>

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
