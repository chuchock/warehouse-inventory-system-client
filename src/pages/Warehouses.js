import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import WarehouseService from '../services/warehouseService';

const Warehouses = () => {

	const [warehouses, setWarehouses] = useState([]);

	useEffect(() => {
		WarehouseService.getWarehouses().then(
			(response) => {
				console.log(response);
				setWarehouses(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<div>
			<h2>Warehouses</h2>
			<br />
			<Link to="/warehouses/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Address</th>
					</tr>
				</thead>
				<tbody>
					{warehouses.map(warehouse => {
						return (
							<tr key={warehouse.warehouseId}>
								<td>{warehouse.name}</td>
								<td>{warehouse.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Warehouses;