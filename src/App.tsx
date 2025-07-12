import { Component } from 'react';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { Footer } from './components/footer/Footer';

export class App extends Component {
  public render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
