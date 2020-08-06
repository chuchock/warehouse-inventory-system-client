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
					</tr>
				</thead>
				<tbody>
					{categories.map(category => {
						return (
							<tr key={category.categoryId}>
								<td>{category.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Categories;