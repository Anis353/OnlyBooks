import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../redux/userReducer';
import "./ClientProfile.css";

function ClientProfile() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSave = async () => {
        // Отправляем изменения на сервер
        const response = await fetch('/api/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                firstName: editedData.firstName,
                lastName: editedData.lastName,
                phone: editedData.phone,
                address: editedData.address,
            }),
        });

        if (response.ok) {
            dispatch(updateUser(editedData));
            setIsEditing(false);
        } else {
            // Обработка ошибки обновления на сервере
            console.error('Ошибка при обновлении данных на сервере');
        }
    };


    // Выход из аккаунта
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="profile-container">
            <h2>Профиль</h2>
            {user && (
                <div className="profile-info">
                    <div className="profile-name">
                        <p className="name">{user.firstName} {user.lastName}</p>
                    </div>
                    <div className="profile-details">
                        <p>Почта: {user.email}</p>
                        <p>Телефон: {user.phone}</p>
                        <p>Адрес: {user.address}</p>
                    </div>
                    {!isEditing ? (
                        <button className="edit-button" onClick={handleEdit}>
                            Редактировать
                        </button>
                    ) : (
                        <div className="edit-form">
                            <input
                                type="text"
                                name="firstName"
                                value={editedData.firstName}
                                onChange={handleChange}
                                placeholder="Имя"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={editedData.lastName}
                                onChange={handleChange}
                                placeholder="Фамилия"
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editedData.phone}
                                onChange={handleChange}
                                placeholder="Телефон"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                value={editedData.address}
                                onChange={handleChange}
                                placeholder="Адрес"
                                required
                            />
                            <button className="save-button" onClick={handleSave}>
                                Сохранить
                            </button>
                        </div>
                    )}
                </div>
            )}
            <button className="logout-button" onClick={handleLogout}>
                <a className="logout-link" href="/login">Выйти</a>
            </button>
        </div>
    );
}

export default ClientProfile;
