import React, { Component } from 'react';

import './Login.css';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="form-header-container">
                    <h1 className="main-header">
                        {this.props.isLoginSwitcher ? 'Login to Submit Info' : 'Register New Account'}
                    </h1>
                </div>
                <form className="auth-form" onSubmit={this.props.login}>
                    <div className="main-control">
                        <label htmlFor="username">Email</label>
                        <input type="email" id="username" ref={this.props.usernameEl} />
                    </div>
                    <div className="main-control">
                        <label htmlFor="password">Identification Code</label>
                        <input type="password" id="password" ref={this.props.passwordEl} />
                    </div>
                    <br/>
                    <div className="main-actions">
                        {this.props.isLoginSwitcher
                        ? <button className="button-main" type="submit" onClick={this.props.login}>Login</button>
                        : <button className="button-main" type="submit">Register</button>}
                        <br/>
                        <button
                            className="button-admin"
                            type="button"
                            onClick={this.props.adminSwitch}
                        >
                            Take me to Admin Login
                        </button>
                        {!this.props.isLoginSwitcher
                        ? <button style={{marginLeft: '1rem'}} className="button-admin" type="button" onClick={this.props.switchModeHandler}>Switch to Login</button>
                        : <button style={{marginLeft: '1rem'}} className="button-admin" type="button" onClick={this.props.switchModeHandler}>Create New Account</button>
                        }
                    </div>
                    <p className={this.props.successColor ? "login-warning-succes" : "login-warning"}>{this.props.errorMessage}</p>
                </form>
            </React.Fragment>
        )
    }
}
