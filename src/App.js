import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

// Pages
import Navigation from './components/Navigation/Navigation';

import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import FormPage from './pages/Form';

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<main className="main-content">
				<Switch>
					<Redirect from="/" to='/login' exact />
					<Route path="/login" component={AuthPage} />
					<Route path="/register" component={RegisterPage} />
					<Route path="/form" component={FormPage} />
				</Switch>
			</main>
		</BrowserRouter>
	);
}

export default App;
