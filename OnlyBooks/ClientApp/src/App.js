import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Loader from './components/Loader'; // Импортируйте компонент Loader
import './custom.css';

export default function App() {
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    //window.onload = () => {
    //    setIsLoading(false);
    //};

    return (
        <Layout>
            {isLoading ? (
                <Loader /> 
            ) : (
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            )}
        </Layout>
    );
}

function getDaysDeclension(days) {
    const lastDigit = days % 10;
    const secondToLastDigit = Math.floor(days / 10) % 10;

    if (secondToLastDigit === 1) {
        return 'дней';
    }

    if (lastDigit === 1) {
        return 'день';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'дня';
    }

    return 'дней';
}
