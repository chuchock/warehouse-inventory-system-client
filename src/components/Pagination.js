import React from 'react';

const Pagination = ({ rowsPerPage, pageNumbers, paginate, nextPage, prevPage }) => {

	let rows = [];

	for (let i = 1; i <= pageNumbers; i++) {
		rows.push(<li key={i} className="page-item">
			<a onClick={() => paginate(i)} className="page-link" href="#">{i}</a>
		</li>)
	}

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination mb-0">
				<li className="page-item"><a onClick={() => prevPage()} className="page-link" href="#">Previous</a></li>
				{
					rows
				}
				<li className="page-item"><a onClick={() => nextPage()} className="page-link" href="#">Next</a></li>
			</ul>
		</nav>
	);
}

export default Pagination