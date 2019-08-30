import React, { Component } from 'react';

// Pages
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/Login';
import AdminLoginPage from './pages/AdminLogin';
import FormPage from './pages/Form';
import './App.css';


// const serverUrl = 'http://localhost:8000/';
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class App extends Component {
	state = {
		page: 'login',

		isLoginSwitcher: true,
		errorMessage: null,
		success: false,

		loggedIn: false,
		token: null,
		userId: null,
	}

    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
	}

	componentDidMount() {
		if (localStorage.getItem('myToken')) {
			this.setState({ token: localStorage.getItem('myToken'), page: 'form'})
		}
	}

    switchModeHandler = (status) => {
		if (status === 'new') {
			this.setState(prevState => {
				return {isLoginSwitcher: !prevState.isLoginSwitcher };
			})
		} else if (status === 'login') {
			this.setState({page: 'login'})
		} else {
			this.setState(prevState => {
				return {isLoginSwitcher: !prevState.isLoginSwitcher, errorMessage: null, success: false};
			})
		}
	}
	
	adminSwitch = () => {
		this.setState({page: 'admin'})
	}

    login = (event) => {
        event.preventDefault();

        const username = this.usernameEl.current.value;
		const password = this.passwordEl.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
			this.setState({
				...this.state.errorMessage,
				errorMessage: 'Please submit a valid Username and Password.'
			})
            return;
		} else if (username === 'Admin') {
			this.setState({
				...this.state.errorMessage,
				errorMessage: 'Switch to Admin Login.'
			})
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

        if (!this.state.isLoginSwitcher) {
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
            // if (res.status !== 200 && res.status !== 201) {
            //     console.log(res)
            //     throw new Error('Failed!')
            // }
            return res.json();
        })
        .then(resData => {
            if (resData.errors) {
                this.setState({
                    ...this.state.errorMessage,
                    errorMessage: resData.errors[0].message
                })
            } else if (resData.data.login) {
				localStorage.setItem('myToken', resData.data.login.token);
				this.setState({
                    token: resData.data.login.token,
                    loggedIn: true, page: 'form',
                    userId: resData.data.login.userId,
                })
			} else if (resData.data.createUser.username === username) {
				this.setState({ success: true, errorMessage: 'You have created a new account! Click "Login".' })
				this.switchModeHandler('new');
			}
        })
        .catch(err => {
            console.log(err);
        });
	};

	adminLogin = (event) => {
        event.preventDefault();

        const username = this.usernameEl.current.value;
		const password = this.passwordEl.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
			this.setState({
				...this.state.errorMessage,
				errorMessage: 'Please submit a valid Username and Password.'
			})
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

        fetch(serverUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if (resData.errors) {
                this.setState({
                    ...this.state.errorMessage,
                    errorMessage: resData.errors[0].message
                })
            } else if (resData.data.login) {
				localStorage.setItem('myToken', resData.data.login.token);
				this.setState({
                    token: resData.data.login.token,
                    loggedIn: true, page: 'form'
                })
			}
        })
        .catch(err => {
            console.log(err);
        });
	};
	
	logout = () => {
		localStorage.removeItem('myToken');
        this.setState({ token: null, errorMessage: null, success: false, page: 'login' });
	}

	render() {
		return (
			<React.Fragment>
				<Navigation
					page={this.state.page}
					loggedIn={this.state.loggedIn}
					token={this.state.token}

					// Actions
					login={this.login}
					logout={this.logout}
				/>
				<main className="main-content">
					{this.state.page === 'login' && !this.state.token
					? <LoginPage
						// State
						isLoginSwitcher={this.state.isLoginSwitcher}
						errorMessage={this.state.errorMessage}
						usernameEl={this.usernameEl}
						passwordEl={this.passwordEl}
						success={this.state.success}
						adminSwitch={this.adminSwitch}

						// Actions
						switchModeHandler={this.switchModeHandler}
						login={this.login}
					/>
					: null}
					{this.state.page === 'admin' && !this.state.token 
						? <AdminLoginPage
							// State
							errorMessage={this.state.errorMessage}
							usernameEl={this.usernameEl}
							passwordEl={this.passwordEl}

							// Actions
							adminLogin={this.adminLogin}
							switchModeHandler={this.switchModeHandler.bind(this, 'login')}
						/> 
						:null
					}
					{this.state.page === 'form' && this.state.token ? (
                        <FormPage
                            token={this.state.token}
                            userId={this.state.userId}
                        />
                    ) : null}
				</main>
			</React.Fragment>
		);
	}
}
