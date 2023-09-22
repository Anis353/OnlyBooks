import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneNumberUtil, PhoneNumberFormat, CountryCodeSource } from 'google-libphonenumber';

function PaymentForm({ closePaymentModal }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(''); // Выбранная страна
    const [error, setError] = useState('');
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);


    const phoneNumberUtil = PhoneNumberUtil.getInstance();

    const handlePayment = () => {
        if (!phoneNumber) {
            setError('Пожалуйста, введите номер телефона.');
            return;
        }

        try {
            let phoneNumberWithCountryCode = phoneNumber;
            if (!phoneNumber.startsWith('+')) {
                phoneNumberWithCountryCode = `+${phoneNumber}`;
            }

            const parsedPhoneNumber = phoneNumberUtil.parse(phoneNumberWithCountryCode);
            if (!phoneNumberUtil.isValidNumber(parsedPhoneNumber)) {
                setError('Номер телефона недействителен.');
                return;
            }

            const formattedPhoneNumber = phoneNumberUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164);
            console.log('Номер телефона:', formattedPhoneNumber);

            // Успешно выполнена оплата
            setIsPaymentCompleted(true);

            setTimeout(() => {
                setIsPaymentCompleted(false); 
                closePaymentModal();
            }, 5000); 

            // Если прошел все проверки, очищаем ошибку
            setError('');
        } catch (error) {
            setError('Произошла ошибка при валидации номера телефона.');
            return;
        }
    };

    const handleCountryChange = (value, countryData) => {
        setSelectedCountry(countryData.iso2); // Сохраняем выбранную страну
    };
    return (
        <div>
            <h2>Оплата</h2>
            {isPaymentCompleted ? (
                <div>
                    <p>Оплата успешно выполнена. Ожидайте звонка оператора.</p>
                </div>
            ) : (
                <div>
                    <PhoneInput
                        defaultCountry="RU"
                        placeholder="Введите номер телефона"
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button onClick={handlePayment}>Оплатить</button>
                </div>
            )}
        </div>
    );
}

export default PaymentForm;
