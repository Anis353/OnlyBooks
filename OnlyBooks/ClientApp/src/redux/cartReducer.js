const initialState = {
    cart: [],
};

export const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    CLEAR_CART: 'CLEAR_CART',
    CLEAR_CART_ITEM: 'CLEAR_CART_ITEM',
    INCREASE_QUANTITY: 'INCREASE_QUANTITY',
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const newItem = action.payload;
            const existingItem = state.cart.find(item => item.id === newItem.id);
            if (existingItem) {
                // Если товар уже есть в корзине, увеличиваем его количество
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                // Если товара нет в корзине, добавляем его
                return {
                    ...state,
                    cart: [...state.cart, { ...newItem, quantity: 1 }],
                };
            };
        case actionTypes.CLEAR_CART_ITEM:
            const bookIdToRemove = action.payload;
            const updatedCart = state.cart.filter((item) => item.id !== bookIdToRemove);
            return {
                ...state,
                cart: updatedCart,
            };
        case actionTypes.INCREASE_QUANTITY: // Обрабатываем увеличение количества товара
            const bookIdToIncrease = action.payload;
            const updatedCartWithIncrease = state.cart.map((item) => {
                if (item.id === bookIdToIncrease) {
                    return {
                        ...item,
                        quantity: item.quantity + 1, // Увеличиваем количество
                    };
                }
                return item;
            });
            return {
                ...state,
                cart: updatedCartWithIncrease,
            };
        default:
            return state;
    }
};

export const addToCart = (item) => ({
    type: actionTypes.ADD_TO_CART,
    payload: item,
});

export const clearCart = () => ({
    type: actionTypes.CLEAR_CART
});

export const clearCartItem = (item) => ({
    type: actionTypes.CLEAR_CART_ITEM,
    payload: item,
});

export const increaseQuantity = (itemId) => ({
    type: actionTypes.INCREASE_QUANTITY,
    payload: itemId,
});