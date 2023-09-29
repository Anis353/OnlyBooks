import { Home } from "./components/Home";
import ProductDetails from './components/ProductDetails';
import BooksList from './components/BooksList';
import CartPage from './components/CartPage';
import LoginPage from './components/authorisation/Login';
import RegisterPage from './components/authorisation/Register';
import ClientProfile from "./components/profiles/ClientProfile";
import AdminProfile from "./components/profiles/AdminProfile";
import SwaggerUIComponent from './utils/SwaggerUI';


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
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/admin/profile',
        element: <AdminProfile />
    },
    {
        path: '/profile',
        element: <ClientProfile />
    },
    {
        path: '/swagger',
        element: <SwaggerUIComponent />
    }

];

export default AppRoutes;
