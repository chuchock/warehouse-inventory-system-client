import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import { authenticationService } from './services/authenticationService';

import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Warehouses from './pages/Warehouses';
import WarehouseNew from './pages/WarehouseNew';
import Categories from './pages/Categories';
import CategoryNew from './pages/CategoryNew';
import Products from './pages/Products';
import ProductNew from './pages/ProductNew';
import NotFound from './pages/NotFound';

const App = () => {

	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		// authenticationService.currentUser.subscribe(x => setCurrentUser(x));
		const user = authenticationService.currentUserValue;

		if (user) {
			setCurrentUser(user);
		}
	}, []);

	return (
		<BrowserRouter>
			{!currentUser ?
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
				:
				<Layout>
					<Switch>
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/warehouses" component={Warehouses} />
						<Route exact path="/warehouses/new" component={WarehouseNew} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/categories/new" component={CategoryNew} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/products/new" component={ProductNew} />
						<Route component={NotFound} />
					</Switch>
				</Layout>
			}
		</BrowserRouter>
	);
}

export default App;