import React, { useState, useEffect } from 'react';

import WarehouseService from '../services/warehouseService';

const Sales = () => {

	const [searchProduct, setSearchProduct] = useState('');

	const [warehouses, setWarehouses] = useState([]);

	useEffect(() => {
		WarehouseService.getWarehouses().then(
			(response) => {
				setWarehouses(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	const handleSearchProduct = (e) => {
		let name = e.target.value;
	}

	const submitSale = () => {

	}

	return (

		<form
			onSubmit={submitSale}
		>
			<div className="form-group">
				<label>Product</label>
				<input
					type="text"
					className="form-control"
					name="searchProduct"
					placeholder="Search the product"
					onChange={handleSearchProduct}
				/>
			</div>

			<div className="form-group">
				<label>Warehouse</label>
				<select
					name="warehouseId"
					className="form-control"
				>
					<option
						value="-1"
					>Choose warehouse</option>
					{warehouses.map(warehouse => {
						return (
							<option
								key={warehouse.warehouseId}
								value={warehouse.warehouseId}
							>{warehouse.name}</option>
						);
					})},
				</select>
			</div>

			<button className="btn btn-primary">Save</button>
		</form>
	);

};

export default Sales;