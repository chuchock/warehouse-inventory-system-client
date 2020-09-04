import React, { useState } from 'react';

import './styles/Product.css';

const Product = ({ inventoryId, name, description, quantity, buyPrice, salePrice, category, saleAction, column, addProduct }) => {

	const [saleQuantity, setSaleQuantity] = useState('');

	const [invalidSaleQuantity, setInvalidSaleQuantity] = useState(false);

	const handleQuantity = (e) => {

		// TODO: validate field
		const saleQuantity = e.target.value;
		setSaleQuantity(saleQuantity);

		saleQuantity > quantity ?
			setInvalidSaleQuantity(true) :
			setInvalidSaleQuantity(false);
	}

	return (
		<div className={column}>
			<div className="card mb-3">
				<div className="card-header">
					<h5 className="card-title">{name}</h5>
				</div>
				<div className="p-2">
					<p className="card-text font small">{description}</p>
				</div>
				<div className="row no-gutters mb-2">
					<div className="col-md-6 product-image">
						<img src="https://thumbs.dreamstime.com/z/cleaning-product-22555088.jpg" className="card-img" alt="" />
					</div>
					<div className="col-md-6">
						<div className="card-body">
							{quantity &&
								<p className="card-text mb-0"><small className="text-muted">In stock: {quantity}</small></p>
							}
							{buyPrice &&
								<p className="card-text mb-0"><small className="text-muted">Buy price: {buyPrice}</small></p>
							}
							{salePrice &&
								<p className="card-text mb-0"><small className="text-muted">Sale price: ${salePrice}</small></p>
							}
							{category &&
								<p className="card-text mb-0"><small className="text-muted">Category: {category}</small></p>
							}

							{/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
						</div>
					</div>
				</div>
				<div>
					{saleAction ?
						<>
							<div className="form-group">
								<input
									type="number"
									placeholder="Quantity"
									name={saleQuantity}
									value={saleQuantity}
									onChange={handleQuantity}
									className={invalidSaleQuantity ? "form-control is-invalid" : "form-control"}
								/>
								{invalidSaleQuantity &&
									<div className="invalid-feedback">
										Quantity should not be more than the stock
									</div>
								}
							</div>
							<div className="form-group">
								<button
									type="button"
									className="btn btn-primary"
									disabled={invalidSaleQuantity || saleQuantity === '' ? 'disabled' : ''}
									onClick={() => addProduct(inventoryId, saleQuantity)}>Add</button>
							</div>
						</>
						:
						<button type="button" className="btn btn-danger">Delete</button>
					}
				</div>
			</div>
		</div>
	)
}

export default Product;
