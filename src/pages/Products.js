import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProductService from '../services/productService';

const Products = () => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		ProductService.getProducts().then(
			(response) => {
				setProducts(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<div>
			<h2>Products</h2>
			<br />
			<Link to="/products/new" className="btn btn-primary">Add new</Link>
			<br /><br />
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => {
						return (
							<tr key={product.productId}>
								<td>{product.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Products;