import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../redux/userReducer';
import { format } from 'date-fns';
import "./AdminProfile.css"; 

function AdminProfile() {
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
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    // Выход из аккаунта
    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await fetch('/api/admin/orders');
                const ordersData = await ordersResponse.json();
                setOrders(ordersData);

                const usersResponse = await fetch('/api/admin/users');  
                const usersData = await usersResponse.json();
                setUsers(usersData);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
            };

        fetchData();
    }, []);

    // Меняем статус оплаты таблицы Order
    const handlePaymentStatusChange = async (index, status) => {
        try {
            const selectedOrder = orders[index];
            const response = await fetch(`/api/admin/update-payment-status/${selectedOrder.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentStatus: status }),
            });

            if (response.ok) {
                const updatedOrders = [...orders];
                updatedOrders[index].paymentStatus = status;
                setOrders(updatedOrders);
            } else {
                console.error('Ошибка при обновлении статуса оплаты');
            }
        } catch (error) {
            console.error('Ошибка при обновлении статуса оплаты:', error);
        }
    };

    // Удаляем запись из таблицы Order
    const handleDeleteOrder = async (index) => {
        try {
            const selectedOrder = orders[index];
            const response = await fetch(`/api/admin/delete-order/${selectedOrder.orderId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedOrders = [...orders];
                updatedOrders.splice(index, 1);
                setOrders(updatedOrders);
            } else {
                console.error('Ошибка при удалении заказа');
            }
        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
        }
    };

    // Обновляем фото профиля
    const handleImageUpload = async (e) => {
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
                console.log('user.imageUrl = ' + user.imageUrl);
            } else {
                console.error('Ошибка при загрузке изображения на сервер');
            }
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    // Обновляем запись в таблице Order
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


    return (
        <div className="admin-profile">
        <div className="admin-profile-container">
            <h2>Администратор</h2>
            {user && (
                <div className="admin-profile-info">
                    <div className="admin-profile-image">
                        <img
                            src={image || '/img/profiles/default.png'} 
                            alt="Профиль"
                            onClick={() => imageInputRef.current.click()} 
                        />
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="admin-profile-name">
                        <p className="name">{user.firstName} {user.lastName}</p>
                    </div>
                    <div className="admin-profile-details">
                            <div className="info-row">
                                <p className="info-label">Почта:</p>
                                <p className="info-value">{user.email}</p>
                            </div>

                            <div className="info-row">
                                <p className="info-label">Телефон:</p>
                                <p className="info-value">{user.phone}</p>
                            </div>

                            <div className="info-row">
                                <p className="info-label">Адрес:</p>
                                <p className="info-value">{user.address}</p>
                            </div>
                    </div>
                    {!isEditing ? (
                        <button className="admin-edit-button" onClick={handleEdit}>
                            Редактировать
                        </button>
                    ) : (
                        <div className="admin-edit-form">
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
                            <button className="admin-save-button" onClick={handleSave}>
                                Сохранить
                            </button>
                        </div>
                    )}
                </div>
            )}
            <button className="admin-logout-button" onClick={handleLogout}>
                <a className="admin-logout-link" href="/login">Выйти</a>
            </button>
        </div>
          <div className="admin-orders-container">
                <h3>Заказы</h3>
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <strong>Email:</strong> {order.email}<br />
                            <strong>Дата заказа:</strong> {format(new Date(order.orderDate), 'yyyy-MM-dd HH:mm')} <br />
                            <strong>Сумма заказа:</strong><span className="totalAmount"> {order.totalAmount}</span><br />
                            <strong>Статус оплаты:</strong> {order.paymentStatus}<br />
                            <strong>Адрес доставки:</strong> {order.shippingAddress}<br />
                            <button onClick={() => handlePaymentStatusChange(index, 'Оплачено')}>Оплачено</button>
                            <button onClick={() => handleDeleteOrder(index)}>Отмена</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="admin-users-container">
                <h3>Пользователи</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Клиент</th>
                            <th>Почта</th>
                            <th>Телефон</th>
                            <th>Адрес</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="truncate">{user.firstName + ' ' + user.lastName}</td>
                                <td className="truncate">{user.email}</td>
                                <td className="truncate">{user.phone}</td>
                                <td className="truncate">{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

     </div>
    );
}

export default AdminProfile;
