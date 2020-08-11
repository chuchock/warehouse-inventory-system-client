import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import WarehouseService from '../services/warehouseService';
import ProductService from '../services/productService';
import InventoryService from '../services/inventoryService';

const InventoryNew = () => {

	const [inventory, setInventory] = useState({
		warehouseId: -1,
		productId: -1,
		quantity: 0
	});

	const [warehouses, setWarehouses] = useState([]);

	const [products, setProducts] = useState([]);

	const updateState = e => {
		setInventory({
			...inventory,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		WarehouseService.getWarehouses().then(
			(response) => {
				setWarehouses(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);

		ProductService.getProducts().then(
			(response) => {
				setProducts(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	const { warehouseId, productId, quantity } = inventory;

	const submitInventory = e => {
		e.preventDefault();

		InventoryService.createInventory(inventory).then(
			(response) => {
				setInventory({
					warehouseId: -1,
					ProductId: -1,
					quantity: 0
				});
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}

	return (
		<Fragment>
			<Link to="/inventories" className="btn btn-link">Back</Link>
			<br /><br />

			<form
				onSubmit={submitInventory}
			>
				<div className="form-group">
					<label>Warehouse</label>
					<select
						name="warehouseId"
						className="form-control"
						onChange={updateState}
						value={warehouseId}
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
						})}
					</select>
				</div>

				<div className="form-group">
					<label>Product</label>
					<select
						name="productId"
						className="form-control"
						onChange={updateState}
						value={productId}
					>
						<option
							value="-1"
						>Choose product</option>
						{products.map(product => {
							return (
								<option
									key={product.productId}
									value={product.productId}
								>{product.name}</option>
							);
						})}
					</select>
				</div>

				<div className="form-group">
					<label>Quantity</label>
					<input
						type="text"
						className="form-control"
						name="quantity"
						placeholder=""
						onChange={updateState}
						value={quantity}
					/>
				</div>

				<button className="btn btn-primary">Save</button>
			</form>
		</Fragment>
	);
}

export default InventoryNew;