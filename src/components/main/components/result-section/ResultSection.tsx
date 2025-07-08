import { Component } from 'react';
import styles from './ResultSection.module.scss';
import { messages } from './messages';

import { Title } from './components/title/Title';
import { Pokemons } from './components/pokemons/Pokemons';

export class ResultSection extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <Title />
        <div className={styles.gridDivider}></div>
        <Pokemons />
        <button className={styles.button}>{messages.errorButton}</button>
      </div>
    );
  }
}
