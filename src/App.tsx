import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { bookStore } from './store/BookStore';

export const App = () => {
  return (
    <Provider store={bookStore}>
      <RouterProvider router={router} />;
    </Provider>
  );
};
