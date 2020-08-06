import React, { Fragment, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';

const Dashboard = () => {

	// const getWarehousesNumber = async () => {
	// 	const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
	// 	const frase = await api.json()
	// 	guardarFrase(frase[0]);
	// }

	// useEffect(() => {
	// 	getWarehousesNumber();
	// }, []);

	return (
		<Fragment>
			<div className="card-deck mb-3 text-center">
				<Card />
				<Card />
				<Card />
			</div>

			<div className="card">
				<h5 className="card-header">RECENTLY ADDED PRODUCTS</h5>
				<div className="card-body">
					<Table />
				</div>
			</div>
		</Fragment>
	);
}

export default Dashboard;