import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userReducer';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Сообщения об ошибке

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('api/user/login', formData); 
            if (response.status === 200) {
                const user = response.data;
                dispatch(setUser(user));
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error('Ошибка входа:', error);
            }
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>} 
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Войти</button>
            </form>
            <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
}

export default Login;
