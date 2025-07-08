import { Component } from 'react';
import { Header } from './components/header/Header';
import { Main } from './pages/main/Main';
import { Footer } from './components/footer/Footer';
import styles from './App.module.scss';

export class App extends Component {
  public render() {
    return (
      <div className={styles.root}>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
