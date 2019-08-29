import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

// Pages
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import FormPage from './pages/Form';
import InfoPage from './pages/Info';

// Context
import AuthContext from './context/auth-context';


export default class App extends Component {
	state = {
		token: null,
		userId: null
	}

	componentDidUpdate() {
		localStorage.setItem('myToken', this.state.token);
	}

	login = (token, userId, tokenExpiration) => {
		this.setState({ token: token, userId: userId});
		localStorage.setItem('myToken', this.state.token);
	}

	logout = (token, userId, tokenExpiration) => {
		this.setState({ token: null, userId: null})
		localStorage.removeItem('myToken');
	}

	render() {
		return (
			<BrowserRouter>
				<AuthContext.Provider
					value={{
						token: this.state.token,
						userId: this.state.userId,
						login: this.login,
						logout: this.logout
					}}>
					<Navigation login={this.login} logout={this.logout} />
					<main className="main-content">
						<Switch>
							<Route path="/register" component={RegisterPage} exact />
							<Route path="/form" component={FormPage} exact />
							<Route path="/info" component={InfoPage} exact />
							<Route path="/" component={Home} exact />
						</Switch>
					</main>
				</AuthContext.Provider>
			</BrowserRouter>
		);
	}
}
