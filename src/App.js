import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Warehouses from './pages/Warehouses';
import WarehouseNew from './pages/WarehouseNew';
import Categories from './pages/Categories';
import Products from './pages/Products';
import NotFound from './pages/NotFound';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/warehouses" component={Warehouses} />
					<Route exact path="/warehouses/new" component={WarehouseNew} />
					<Route exact path="/categories" component={Categories} />
					<Route exact path="/products" component={Products} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;