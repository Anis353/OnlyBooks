﻿import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import MenuHeader from './MenuHeader';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';

function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const cart = useSelector(state => state.cart.cart);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <div className="wrapper">
                <Navbar className="navbar-expand-sm ng-white box-shadow mb-3">
                    <NavbarBrand tag={Link} to="/">
                        <img className="logo" src="/images/logo.png" />
                    </NavbarBrand>
                    <div className="tools-header">
                        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                        <SearchBar />
                        <div className="personal-tools">
                            <button className="btn-message">
                                <img src="/images/icons/icon-message-static.png" />
                                Сообщение
                            </button>
                            <button className="btn-office">
                                <img src="/images/icons/icon-office.png" />
                                Мой Кабинет
                            </button>
                            <button className="btn-favorite">
                                <img src="/images/icons/icon-favorite.png" />
                                Отложено
                            </button>
                            <button className="btn-cart" >
                                <a href="/cart">
                                <img src="/images/icons/icon-cart.png" />
                                    Корзина {(cart.length > 0 ? `(${cart.length})` : '')}
                                </a>
                            </button>
                        </div>
                        <MenuHeader />
                    </div>
                </Navbar>
            </div>
        </header>
    );
}

export default NavMenu;
