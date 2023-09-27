const initialState = {
    user: null, 
};

export const actionTypes = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const setUser = (user) => {
    console.log('Setting user:', user);
    return {
        type: actionTypes.SET_USER,
        payload: user,
    };
};

export const logout = () => ({
    type: actionTypes.LOGOUT,
});
