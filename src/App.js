import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

// Pages
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import FormPage from './pages/Form';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect from="/" to='/login' exact />
				<Route path="/login" component={AuthPage} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/form" component={FormPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
