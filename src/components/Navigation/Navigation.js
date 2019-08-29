import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './Navigation.css';

const Navigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <NavLink to="/">
                            <h1>Merrill Lynch Registration</h1>
                        </NavLink>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {localStorage.getItem('myToken') && <li><NavLink to="/register">Registration</NavLink></li>}
                            {localStorage.getItem('myToken') && <li><NavLink to="/form">Form</NavLink></li>}
                            {!localStorage.getItem('myToken') 
                            ? <li onClick={props.login}><NavLink to="/" exact>Login</NavLink></li>
                            : <li onClick={props.logout}><NavLink to="/" exact>Logout</NavLink></li>}
                        </ul>
                    </nav>
                </header>
            )
        }}   
    </AuthContext.Consumer>
)

export default Navigation;
