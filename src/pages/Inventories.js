import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import WarehouseService from '../services/warehouseService';
import InventoryService from '../services/inventoryService';

const Inventories = () => {

	const [inventories, setInventories] = useState([]);

	const [warehouses, setWarehouses] = useState([]);

	useEffect(() => {
		InventoryService.getInventoryByWarehouse().then(
			(response) => {
				setInventories(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<div>
			<h2>Inventories</h2>
			<br />
			<Link to="/inventories/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			<form>
				<div className="form-group">
					<label>Warehouse</label>
					<select
						// name="warehouseId"
						className="form-control"
						// value={warehouseId}
					>
						{warehouses.map(warehouse => {
							return (
								<option
									key={warehouse.warehouseId}
									value={warehouse.warehouseId}
								>{warehouse.name}</option>
							);
						})}
					</select>
				</div>

				<button className="btn btn-primary">Search</button>
			</form>

			<br></br>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
					</tr>
				</thead>
				<tbody>
					{inventories.map(inventory => {
						return (
							<tr key={inventory.inventoryId}>
								<td>{inventory.name}</td>
								<td className="table-actions">
									<button type="button" className="btn btn-primary"><i className="fas fa-eye"></i></button>
									<button type="button" className="btn btn-success"><i className="fas fa-edit"></i></button>
									{/* <button
										type="button"
										className="btn btn-danger"
										onClick={() => deleteCategory(category.categoryId)}
									><i className="fas fa-trash-alt"></i></button> */}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Inventories;