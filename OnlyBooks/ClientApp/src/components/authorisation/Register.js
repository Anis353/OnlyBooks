import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Register() {
    const [errorMessage, setErrorMessage] = useState(''); // Сообщения об ошибке
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
        }

        try {
            const response = await axios.post('api/user/register', formData);
            console.log(response.data); 
            setRegistrationSuccess(true);
        } catch (error) {
            setErrorMessage('Ошибка регистрации: ' +  error);
        }
    };

    return (
        <div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {registrationSuccess ? (
                <div>
                    <p>Пользователь успешно создан, теперь можно войти.</p>
                    <p><a href="/login">Войти</a></p>
                </div>
            ) : (
                <div>
                    <h2>Регистрация</h2>
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Имя"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Фамилия"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Повторить пароль"
                            required
                        />
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Register;
