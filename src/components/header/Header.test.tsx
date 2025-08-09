import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { messages } from './components/options-menu/messages';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

describe('Header component', () => {
  it('Renders the header with correct title', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(screen.getByText(messages.appTitle)).toBeInTheDocument();
  });
});
