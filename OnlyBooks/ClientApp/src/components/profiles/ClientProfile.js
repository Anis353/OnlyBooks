import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { withRouter } from 'react-router-dom';
function ClientProfile(props) {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // Выход из аккаунта
    const handleLogout = () => {
        dispatch(logout());
        props.history.push('/login');
    };

    return (
        <div>
            <h2>Профиль клиента</h2>
            {user && (
                <div>
                    <p>Имя: {user.firstName}</p>
                    <p>Фамилия: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default ClientProfile;
