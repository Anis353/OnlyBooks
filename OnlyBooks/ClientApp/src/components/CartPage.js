import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartReducer'; 
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
            <h2>Корзина</h2>
            {cartItems.length > 0 ? (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.title} - {(item.discountPrice > 0 ? item.discountPrice : item.price)}
                            </li>
                        ))}
                    </ul>
                    <button>Оплатить</button>
                    <button onClick={handleClearCart}>Очистить корзину</button>
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
};

export default CartPage;
