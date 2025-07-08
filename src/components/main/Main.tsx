import { Component } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ResultSection } from './components/result-section/ResultSection';

export class Main extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <SearchSection />
        <ResultSection />
      </div>
    );
  }
}
