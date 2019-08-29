import React, { Component } from 'react';

// Pages
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';

import './App.css';


// const serverUrl = 'http://localhost:8000/';
const serverUrl = 'https://ml-registration-server.herokuapp.com/';

export default class App extends Component {
	state = {
		page: 'login',

		isLoginSwitcher: true,
		errorMessage: null,

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
			this.setState({token: localStorage.getItem('myToken')})
		}
	}

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLoginSwitcher: !prevState.isLoginSwitcher, errorMessage: null};
		})
    }

    login = (event) => {
        event.preventDefault();

        const username = this.usernameEl.current.value;
		const password = this.passwordEl.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
			this.setState({
				...this.state.errorMessage,
				errorMessage: 'Please submit a valid Username and Password'
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
            } else if (resData.data.login.token) {
				localStorage.setItem('myToken', resData.data.login.token);
				this.setState({token: resData.data.login.token})
			}
        })
        .catch(err => {
            console.log(err);
        });
	};
	
	logout = () => {
		localStorage.removeItem('myToken');
		this.setState({ token: null })
		console.log(this.state.token);
	}

	render() {
		return (
			<React.Fragment>
				<Navigation
					page={this.state.page}
					loggedIn={this.state.loggedIn}
					token={this.state.token}
					login={this.login}
					logout={this.logout}
				/>
				<main className="main-content">
					{this.state.page === 'login' && !this.state.token
					? <Home 
						isLoginSwitcher={this.state.isLoginSwitcher}
						errorMessage={this.state.errorMessage}
						switchModeHandler={this.switchModeHandler}
						usernameEl={this.usernameEl}
						passwordEl={this.passwordEl}

						login={this.login}
					/>
					: null}
					{/* <Switch>
						<Route path="/register" component={RegisterPage} exact />
						<Route path="/form" component={FormPage} exact />
						<Route path="/info" component={InfoPage} exact />
					</Switch> */}
				</main>
			</React.Fragment>
		);
	}
}
