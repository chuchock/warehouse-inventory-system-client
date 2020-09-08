import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

import WarehouseService from '../services/warehouseService';
import InventoryService from '../services/inventoryService';

const Inventories = () => {

	const [inventories, setInventories] = useState([]);

	const [warehouses, setWarehouses] = useState([]);

	const [pageNum, setPageNum] = useState(1);

	const [totalPaginationPages, setTotalPaginationPages] = useState(0);

	const [warehouse, setWarehouse] = useState('-1');

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

	const handleChange = e => {
		setWarehouse(e.target.value);

		InventoryService.getInventoriesByWarehouse(e.target.value, pageNum).then(
			(response) => {
				setTotalPaginationPages(response.headers.totalamountpages);
				setInventories(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}

	const paginate = pageNum => {
		setPageNum(pageNum);
	}

	const nextPage = () => {
		if (pageNum + 1 <= totalPaginationPages)
			setPageNum(pageNum + 1);
	};

	const prevPage = () => {
		if (pageNum - 1 > 0)
			setPageNum(pageNum - 1);
	}

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
						className="form-control"
						onChange={handleChange}
					>
						<option value="">Choose warehouse</option>
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
			</form>

			<br></br>

			{inventories.length === 0 && warehouse !== '' ? (
				<div className="alert alert-info" role="alert">
					There are no registered inventories.
				</div>
			) :
				<>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Product</th>
								<th scope="col">Quantity</th>
							</tr>
						</thead>
						<tbody>
							{inventories.map(inventory => {
								return (
									<tr key={inventory.inventoryId}>
										<td>{inventory.product.name}</td>
										<td>{inventory.quantity}</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className="d-flex justify-content-center">
						<Pagination
							rowsPerPage={10}
							pageNumbers={totalPaginationPages}
							paginate={paginate}
							prevPage={prevPage}
							nextPage={nextPage}
						/>
					</div>
				</>
			}
		</div>
	);
};

export default Inventories;