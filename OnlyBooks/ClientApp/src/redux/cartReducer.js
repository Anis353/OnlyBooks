const initialState = {
    cart: [],
};

export const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    CLEAR_CART: 'CLEAR_CART'
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case actionTypes.CLEAR_CART: 
            return {
                ...state,
                cart: []
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