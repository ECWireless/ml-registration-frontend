import React, { Component } from 'react';

// Pages
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/Login';
import AdminLoginPage from './pages/AdminLogin';
import FormPage from './pages/Form';
import './App.css';

// Components
import Info from './components/Info/Info';

// const serverUrl = 'http://localhost:8000/';
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

const codes = [
    "P4Mth'25rQyB"
];

export default class App extends Component {
	state = {
		page: 'home',

		isLoginSwitcher: false,
		errorMessage: '',
		successColor: false,

		loggedIn: false,
		token: null,
        userId: null,
        username: '',
	}

    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
	}

	componentDidMount() {
		if (localStorage.getItem('myToken')) {
			this.setState({
                token: localStorage.getItem('myToken'),
                page: 'form',
                loggedIn: true,
            })
		}
    }

    onHomeHandler = () => {
        if (this.state.loggedIn) {
            return;
        } else {
            this.setState({ page: 'home'})
        }
    }
    
    onBeginHandler = () => {
        this.setState({ page: 'login'})
    }

    switchModeHandler = (status) => {
		if (status === 'new') {
			this.setState(prevState => {
				return {isLoginSwitcher: !prevState.isLoginSwitcher };
			})
			this.login();
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
		if (event !== undefined) {
			event.preventDefault();
		}
		
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
        } else if (password !== codes[0] && !password !== codes[1] && !password !== codes[2]) {
            this.setState({
				errorMessage: 'ID Code is wrong!'
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
                localStorage.setItem('userId', resData.data.login.userId);
				this.setState({
                    token: resData.data.login.token,
                    loggedIn: true,
                    page: 'form',
                    userId: resData.data.login.userId,
                })
			} else if (resData.data.createUser.username === username) {
				this.setState({ isLoginSwitcher: true, successColor: true, errorMessage: 'You have created a new account! Click "Login".' })
				this.login();
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
                    errorMessage: resData.errors[0].message,
                    successColor: false,
                })
            } else if (resData.data.login) {
                localStorage.setItem('myToken', resData.data.login.token);
                localStorage.setItem('userId', resData.data.login.userId);
				this.setState({
                    token: resData.data.login.token,
                    loggedIn: true,
                    page: 'form',
                    successColor: true,
                })
			}
        })
        .catch(err => {
            console.log(err);
        });
	};
	
	logout = () => {
        localStorage.removeItem('myToken');
        localStorage.removeItem('userId');
        this.setState({
            token: null,
            errorMessage: null,
            successColor: false,
            page: 'login',
            username: null,
            loggedIn: false,
        });
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
                    onHomeHandler={this.onHomeHandler}
				/>
				<main className="main-content">
                    {this.state.page === 'home' && !this.state.loggedIn &&
                        <div className="begin__container">
                            <button
                                className="begin__btn"
                                onClick={this.onBeginHandler}
                            >
                                Begin Registration
                            </button>
                        </div>
                    }
					{this.state.page === 'login' && !this.state.token
					? <LoginPage
						// State
						isLoginSwitcher={this.state.isLoginSwitcher}
						errorMessage={this.state.errorMessage}
						usernameEl={this.usernameEl}
						passwordEl={this.passwordEl}
						successColor={this.state.successColor}
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
                            successColor={this.state.successColor}

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
                    { this.state.page === 'home' && <Info /> }

                    {this.state.page === 'home' && !this.state.loggedIn &&
                        <div className="begin__container">
                            <button
                                className="begin__btn"
                                onClick={this.onBeginHandler}
                            >
                                Begin Registration
                            </button>
                        </div>
                    }
				</main>
			</React.Fragment>
		);
	}
}
