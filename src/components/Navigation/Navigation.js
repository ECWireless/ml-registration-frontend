import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation() {
    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>Merrill Lynch Registration</h1>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    <li><NavLink to="/register">Registration</NavLink></li>
                    <li><NavLink to="/form">Form</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}
