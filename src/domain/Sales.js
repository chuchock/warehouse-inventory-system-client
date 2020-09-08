import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

import SaleService from '../services/saleService';

const Sales = () => {

	const [sales, setSales] = useState([]);

	const [pageNum, setPageNum] = useState(1);

	const [totalPaginationPages, setTotalPaginationPages] = useState(0);

	useEffect(() => {
		SaleService.getSales(pageNum).then(
			(response) => {
				setTotalPaginationPages(response.headers.totalamountpages);
				setSales(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [pageNum]);

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

	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

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
							</tr>
						</thead>
						<tbody>
							{sales.map(sale => {
								return (
									<tr key={sale.saleId}>
										<td>{sale.formatedDate}</td>
										<td>{formatter.format(sale.total)}</td>
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

export default Sales;