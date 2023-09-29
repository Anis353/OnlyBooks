﻿import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../redux/userReducer';
import './ClientProfile.css';

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
    const [image, setImage] = useState(user.imageUrl || '');
    const imageInputRef = useRef(null);

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`/api/user/upload-image?userEmail=${user.email}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imageUrlUpdate = await response.text();
                setImage(imageUrlUpdate);
                dispatch(updateUser({ imageUrl: imageUrlUpdate }));
            } else {
                console.error('Ошибка при загрузке изображения на сервер');
            }
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSave = async () => {
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
            console.error('Ошибка при обновлении данных на сервере');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="profile-container">
            <h2>Профиль</h2>
            {user && (
                <div className="profile-info">
                    <div className="profile-image">
                        <img src={image || '/img/profiles/default.png'} alt="Профиль" onClick={() => imageInputRef.current.click()} />
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
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
