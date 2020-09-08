import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Product from '../components/Product';

import ProductService from '../services/productService';

const Products = () => {

	const [products, setProducts] = useState([]);

	const [pageNum, setPageNum] = useState(1);

	const [totalPaginationPages, setTotalPaginationPages] = useState(0);

	useEffect(() => {
		ProductService.getProducts(pageNum).then(
			(response) => {
				setTotalPaginationPages(response.headers.totalamountpages);
				setProducts(response.data);
			},
			(error) => {
				console.log("error: " + error);
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

	return (
		<div>
			<h2>Products</h2>
			<br />
			<Link to="/products/new" className="btn btn-primary">Add new</Link>
			<br /><br />

			{products.length === 0 ? (
				<div className="alert alert-info" role="alert">
					There are no registered products.
				</div>
			)
				:
				<>
					<div className="text-center">
						<h5>Number of products: {products.length}</h5>
					</div>

					<div className="row">
						{products.map(product => {
							return (
								<Product
									key={product.productId}
									name={product.name}
									description={product.description}
									buyPrice={product.buyPrice}
									salePrice={product.salePrice}
									category={product.category.name}
									column={'col-md-6'}
								/>
							);
						})}
					</div>

					<div className="d-flex justify-content-center mt-4">
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

export default Products;