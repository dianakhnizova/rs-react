import { Component } from 'react';
import styles from './ProductsSection.module.scss';
import { messages } from './messages';
import { Title } from './components/title/Title';
import { PokemonsList } from './components/pokemons-list/PokemonsList';

interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
}

export class ProductsSection extends Component<Props> {
  public render() {
    return (
      <div className={styles.container}>
        <Title />
        <div className={styles.gridDivider} />
        <PokemonsList
          setLoading={this.props.setLoading}
          searchTerm={this.props.searchTerm}
        />
        <button className={styles.button}>{messages.errorButton}</button>
      </div>
    );
  }
}
