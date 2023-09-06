import { Home } from "./components/Home";
import ProductDetails from './components/ProductDetails';
import BooksList from './components/BooksList';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: '/book/:id',
      element: <ProductDetails />
    },
    {
        path: '/category/:filter/:title',
        element: <BooksList /> 
    },

];

export default AppRoutes;
