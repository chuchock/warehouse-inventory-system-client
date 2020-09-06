import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';


import SaleService from '../services/saleService';

const Sales = () => {

	const [sales, setSales] = useState([]);

	useEffect(() => {
		SaleService.getSales().then(
			(response) => {
				console.log(response);
				setSales(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<div>
			<h2>Sales</h2>
			<br />
			<Link to="/sales/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			{sales.length === 0 ? (
				<div className="alert alert-info" role="alert">
					No registered sales.
				</div>
			) :
				<>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Total</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{sales.map(sale => {
								return (
									<tr key={sale.saleId}>
										<td>{sale.saleDate}</td>
										<td>{sale.total}</td>
										<td className="table-actions">
											<button type="button" className="btn btn-primary"><i className="fas fa-eye"></i></button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className="d-flex justify-content-center">
						<Pagination
							rowsPerPage={10}
							totalRows={sales.length}
						/>
					</div>
				</>
			}
		</div>
	);
}

export default Sales;