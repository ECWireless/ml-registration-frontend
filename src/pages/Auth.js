import React, { Component } from 'react';

import './Auth.css';

// const serverUrl = 'http://localhost:8000/';
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class Auth extends Component {
    state = {
        isLogin: true,
    }

    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(username: "${username}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        if (!this.state.isLogin) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {username: "${username}", password: "${password}"}) {
                            _id
                            username
                        }
                    }
                `
            };
        }

        fetch(serverUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!')
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <h1 className="form-header">
                    {this.state.isLogin ? 'Login' : 'Create Account'} to Register
                </h1>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={this.usernameEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEl} />
                </div>
                <div className="form-actions">
                    {this.state.isLogin
                    ?<React.Fragment>
                        <button type="submit">Login</button>
                        <button type="button" onClick={this.switchModeHandler}>Create New Account</button>
                    </React.Fragment>
                    :<React.Fragment>
                        <button type="submit">Create</button>
                        <button type="button" onClick={this.switchModeHandler}>Switch to Login</button>
                    </React.Fragment>}
                    
                </div>
            </form>
        )
    }
}
