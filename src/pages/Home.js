import React, { Component } from 'react';

import './Home.css';


export default class Home extends Component {
    render() {
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
                        <button type="submit" onClick={this.props.login}>Login</button>
                        <button type="button" onClick={this.props.switchModeHandler}>Create New Account</button>
                    </React.Fragment>
                    :<React.Fragment>
                        <button type="submit">Create</button>
                        <button type="button" onClick={this.props.switchModeHandler}>Switch to Login</button>
                    </React.Fragment>}
                </div>
                <p className="form-warning">{this.props.errorMessage}</p>
            </form>
        )
    }
}
