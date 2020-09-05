import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles/Warehouses.css';

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

	const deleteWarehouse = warehouseId => {
		// get differents of id from appointments, we use !
		const newWarehouses = warehouses.filter(warehouse => warehouse.warehouseId !== warehouseId);
		setWarehouses(newWarehouses);
	}

	return (
		<div>
			<h2>Warehouses</h2>
			<br />
			<Link to="/warehouses/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			{warehouses.length === 0 ? (
				<div className="alert alert-info" role="alert">
					There are no registered warehouses.
				</div>
			) :
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Address</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{warehouses.map(warehouse => {
							return (
								<tr key={warehouse.warehouseId}>
									<td>{warehouse.name}</td>
									<td>{warehouse.address}</td>
									<td className="table-actions">
										<button type="button" className="btn btn-primary"><i className="fas fa-eye"></i></button>
										<button type="button" className="btn btn-success"><i className="fas fa-edit"></i></button>
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => deleteWarehouse(warehouse.warehouseId)}
										><i className="fas fa-trash-alt"></i></button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			}
		</div>
	);
}

export default Warehouses;