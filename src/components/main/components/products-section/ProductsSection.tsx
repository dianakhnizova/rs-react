import { Component } from 'react';
import styles from './ProductsSection.module.scss';
import { messages } from './messages';
import { Title } from './components/title/Title';
import { PokemonsList } from './components/pokemons-list/PokemonsList';

export class ProductsSection extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <Title />
        <div className={styles.gridDivider} />
        <PokemonsList />
        <button className={styles.button}>{messages.errorButton}</button>
      </div>
    );
  }
}
