import React from 'react';

import './Navigation.css';

export default function Navigation(props) {
    return (
        <React.Fragment>
            <header className="main-navigation">
                <div className="main-navigation__logo">
                        <h1>Merrill Lynch Registration</h1>
                </div>
                <nav className="main-navigation__items">
                    <ul>
                        {!props.token ? <li onClick={props.login}>Login</li> : null}
                        {props.token ? <li onClick={props.logout}>Logout</li> : null}
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}
