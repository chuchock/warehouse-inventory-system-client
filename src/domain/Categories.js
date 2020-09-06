import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

import CategoryService from '../services/categoryService';

const Categories = () => {

	const [categories, setCategories] = useState([]);

	const [pageNum, setPageNum] = useState(1);

	const [totalPaginationPages, setTotalPaginationPages] = useState(0);

	useEffect(() => {
		CategoryService.getCategories(pageNum).then(
			(response) => {
				console.log(response);
				setTotalPaginationPages(response.headers.totalamountpages);
				setCategories(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, [pageNum]);

	const deleteCategory = categoryId => {
		const newCategories = categories.filter(category => category.categoryId !== categoryId);
		setCategories(newCategories);
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
			<h2>Categories</h2>
			<br />
			<Link to="/categories/new" className="btn btn-primary">Add new</Link>

			<br /><br />

			{categories.length === 0 ? (
				<div className="alert alert-info" role="alert">
					There are no registered categories.
				</div>
			) :
				<>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{categories.map(category => {
								return (
									<tr key={category.categoryId}>
										<td>{category.name}</td>
										<td className="table-actions">
											<button type="button" className="btn btn-primary"><i className="fas fa-eye"></i></button>
											<button type="button" className="btn btn-success"><i className="fas fa-edit"></i></button>
											<button
												type="button"
												className="btn btn-danger"
												onClick={() => deleteCategory(category.categoryId)}
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
};

export default Categories;