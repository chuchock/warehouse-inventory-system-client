import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CategoryService from '../services/categoryService';

const Categories = () => {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		CategoryService.getCategories().then(
			(response) => {
				console.log(response);
				setCategories(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	const deleteCategory = categoryId => {
		const newCategories = categories.filter(category => category.categoryId !== categoryId);
		setCategories(newCategories);
	}

	return (
		<div>
			<h2>Categories</h2>
			<br />
			<Link to="/categories/new" className="btn btn-primary">Add new</Link>
			<br /><br />
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
		</div>
	);
};

export default Categories;