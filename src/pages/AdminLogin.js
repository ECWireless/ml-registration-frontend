import React, { Component } from 'react';

import './Login.css';


export default class Home extends Component {
    render() {
        console.log(this.props.success)
        return (
            <form className="auth-form" onSubmit={this.props.adminlogin}>
                <h1 className="form-header">
                    Admin Login
                </h1>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={this.props.usernameEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.props.passwordEl} />
                </div>
                <div className="form-actions">
                    <button className="button-main" type="submit" onClick={this.props.adminLogin}>Login</button>
                </div>
                <p className={this.props.success ? "form-warning-succes" : "form-warning"}>{this.props.errorMessage}</p>
            </form>
        )
    }
}
