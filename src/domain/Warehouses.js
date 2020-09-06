import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

import './styles/Warehouses.css';

import WarehouseService from '../services/warehouseService';

const Warehouses = () => {

	const [warehouses, setWarehouses] = useState([]);

	const [pageNum, setPageNum] = useState(1);

	const [totalPaginationPages, setTotalPaginationPages] = useState(0);

	useEffect(() => {
		WarehouseService.getWarehouses(pageNum).then(
			(response) => {
				console.log(response);
				setTotalPaginationPages(response.headers.totalamountpages);
				setWarehouses(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, [pageNum]);

	const deleteWarehouse = warehouseId => {
		const newWarehouses = warehouses.filter(warehouse => warehouse.warehouseId !== warehouseId);
		setWarehouses(newWarehouses);
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
			<h2>Warehouses</h2>
			<br />
			<Link to="/warehouses/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			{warehouses.length === 0 ? (
				<div className="alert alert-info" role="alert">
					There are no registered warehouses.
				</div>
			) :
				<>
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
}

export default Warehouses;