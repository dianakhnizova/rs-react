import { Component } from 'react';
import { HomePage } from './pages/home-page/HomePage';
import { Header } from './components/header/Header';

export class App extends Component {
  public render() {
    return (
      <>
        <Header />
        <HomePage />
      </>
    );
  }
}
