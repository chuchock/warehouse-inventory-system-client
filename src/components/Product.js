import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Product.css';

const Product = ({name, description, quantity, buyPrice, salePrice}) => (
	<div className="col-md-6">
		<div className="card mb-3">
			<div className="card-header">
				<h5 className="card-title">{name}</h5>
			</div>
			<div className="row no-gutters">
				<div className="col-md-6 product-image">
					<img src="https://thumbs.dreamstime.com/z/cleaning-product-22555088.jpg" className="card-img" alt="" />
				</div>
				<div className="col-md-6">
					<div className="card-body">
						<p className="card-text">{description}</p>
						<p className="card-text"><small className="text-muted">Quantity: {quantity}</small></p>
						<p className="card-text"><small className="text-muted">Buy price: {buyPrice}</small></p>
						<p className="card-text"><small className="text-muted">Sale price: {salePrice}</small></p>
						<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
					</div>
				</div>
			</div>
			<div>
				<button type="button" className="btn btn-danger">Delete</button>
			</div>
		</div>

	</div>
);

export default Product;
