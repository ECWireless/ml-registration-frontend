import React, { Component } from 'react';

import './Login.css';


export default class Home extends Component {
    render() {
        console.log(this.props.success)
        return (
            <form className="auth-form" onSubmit={this.props.login}>
                <h1 className="form-header">
                    {this.props.isLoginSwitcher ? 'Login' : 'Create Account'} to Register
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
                    {this.props.isLoginSwitcher
                    ?<React.Fragment>
                        <button className="button-switch" type="button" onClick={this.props.switchModeHandler}>Create New Account</button>
                        <button className="button-main" type="submit" onClick={this.props.login}>Login</button>
                    </React.Fragment>
                    :<React.Fragment>
                        <button className="button-switch" type="button" onClick={this.props.switchModeHandler}>Switch to Login</button>
                        <button className="button-main" type="submit">Create</button>
                    </React.Fragment>}
                    <button
                        className="button-admin"
                        type="button"
                        onClick={this.props.adminSwitch}
                    >
                        Take me to Admin Login
                    </button>

                </div>
                <p className={this.props.success ? "form-warning-succes" : "form-warning"}>{this.props.errorMessage}</p>
            </form>
        )
    }
}
