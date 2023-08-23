import { Home } from "./components/Home";
import BookDetailsPage from './components/BookDetailsPage';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: '/book/:id',
      element: <BookDetailsPage />
  },

];

export default AppRoutes;
