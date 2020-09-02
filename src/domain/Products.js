import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProductService from '../services/productService';

import Product from '../components/Product';

const Products = () => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		ProductService.getProducts().then(
			(response) => {
				console.log(products);
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

			{products.length === 0 && (
				<div className="alert alert-info" role="alert">
					There are no registered products.
				</div>
			)}

			<div className="row">
				{products.map(product => {
					return (
						<Product
							key={product.productId}
							name={product.name}
							description={product.description}
							quantity={product.quantity}
							buyPrice={product.buyPrice}
							salePrice={product.salePrice}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Products;