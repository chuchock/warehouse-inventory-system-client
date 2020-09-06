import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Login from '../domain/auth/Login';
import Register from '../domain/auth/Register';
import Dashboard from '../domain/Dashboard';
import Inventories from '../domain/Inventories';
import InventoryNew from '../domain/InventoryNew';
import Warehouses from '../domain/Warehouses';
import WarehouseNew from '../domain/WarehouseNew';
import Categories from '../domain/Categories';
import CategoryNew from '../domain/CategoryNew';
import Products from '../domain/Products';
import ProductNew from '../domain/ProductNew';
import Sales from '../domain/Sales';
import SalesNew from '../domain/SalesNew';
import NotFound from '../domain/NotFound';

import { authenticationService } from '../services/authenticationService';

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
					<Route exact path={["/", "/login"]} component={Login} />
					<Route exact path="/register" component={Register} />
					<Route component={NotFound} />
				</Switch>
				:
				<Layout>
					<Switch>
						<Route exact path={['/', '/dashboard']} component={Dashboard} />
						<Route exact path="/sales" component={Sales} />
						<Route exact path="/sales/new" component={SalesNew} />
						<Route exact path="/inventories" component={Inventories} />
						<Route exact path="/inventories/new" component={InventoryNew} />
						<Route exact path="/warehouses" component={Warehouses} />
						<Route exact path="/warehouses/new" component={WarehouseNew} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/categories/new" component={CategoryNew} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/products/new" component={ProductNew} />
					</Switch>
				</Layout>
			}
		</BrowserRouter>
	);
}

export default App;