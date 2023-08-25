import { Home } from "./components/Home";
import ProductDetails from './components/ProductDetails';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: '/book/:id',
      element: <ProductDetails />
  },

];

export default AppRoutes;
