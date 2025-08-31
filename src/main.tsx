import { createRoot } from 'react-dom/client';
import './global.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
