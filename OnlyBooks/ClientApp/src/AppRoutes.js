import { Home } from "./components/Home";
import ProductDetails from './components/ProductDetails';
import BooksList from './components/BooksList';
import CartPage from './components/CartPage';
const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/book/:id',
        element: <ProductDetails updateCartItemCount={(count) => this.updateCartItemCount(count)} />
    },
    {
        path: '/category/:filter/:title',
        element: <BooksList />
    },
    {
        path: '/cart',
        element: <CartPage />
    }
];

export default AppRoutes;
