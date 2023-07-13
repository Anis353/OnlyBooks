/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import MenuHeader from './MenuHeader';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <div className="wrapper">
                    <Navbar className="navbar-expand-sm ng-white box-shadow mb-3">
                        <NavbarBrand tag={Link} to="/">
                            <img className="logo" src="/images/logo.png" />
                        </NavbarBrand>
                    <div className="tools-header"> 
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <form className="form-search">
                            <input
                                placeholder="Поиск книги"
                                aria-label="Поиск книги"
                            ></input>
                            <button type="submit">
                                <img src="/images/icons/lupa.png" alt="Поиск" className="icon-search" />
                                Искать
                            </button>
                            </form>
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
                                <button className="btn-cart">
                                    <img src="/images/icons/icon-cart.png" />
                                    Корзина
                                </button>
                            </div>
                            <MenuHeader />
                        </div>
                    </Navbar>
                </div>
            </header>
        );
    }
}
