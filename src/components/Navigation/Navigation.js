import React from 'react';
import Logo from '../../assets/ml-logo.png';

import './Navigation.css';

export default function Navigation(props) {
    return (
        <React.Fragment>
            <header className="main-navigation">
                <div className="main-navigation__logo" onClick={props.onHomeHandler}>
                        <img
                        className="main-navigation__image"
                        alt="logo"
                        src={Logo}
                    />
                </div>
                <nav className="main-navigation__items">
                    <ul>
                        {props.token ? <li onClick={props.logout}>Logout</li> : null}
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}
