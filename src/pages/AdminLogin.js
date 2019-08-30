import React, { Component } from 'react';

import './Login.css';


export default class Home extends Component {
    render() {
        console.log(this.props.success)
        return (
            <form className="auth-form" onSubmit={this.props.adminlogin}>
                <h1 className="main-header">
                    Admin Login
                </h1>
                <div className="main-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={this.props.usernameEl} />
                </div>
                <div className="main-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.props.passwordEl} />
                </div>
                <br/>
                <div className="main-actions">
                    <button className="button-main" type="submit" onClick={this.props.adminLogin}>Login</button>
                </div>
                <button
                    className="button-admin"
                    type="button"
                    onClick={this.props.switchModeHandler}
                >
                    Take me to User Login
                </button>
                <p className={this.props.success ? "form-warning-succes" : "form-warning"}>{this.props.errorMessage}</p>
            </form>
        )
    }
}
