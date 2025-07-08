import { Component } from 'react';
import { HomePage } from './pages/home-page/HomePage';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

export class App extends Component {
  public render() {
    return (
      <>
        <Header />
        <HomePage />
        <Footer />
      </>
    );
  }
}
