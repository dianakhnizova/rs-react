import { Component } from 'react';
import { HomePage } from './pages/home-page/HomePage';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import styles from './App.module.scss';

export class App extends Component {
  public render() {
    return (
      <div className={styles.root}>
        <Header />
        <HomePage />
        <Footer />
      </div>
    );
  }
}
