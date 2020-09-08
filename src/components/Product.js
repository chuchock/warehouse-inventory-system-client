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
					<h5 className="card-title mb-0">{name}</h5>
				</div>
				<div className="p-2">
					<p className="card-text font small">{description}</p>
				</div>
				<div className="row no-gutters mb-2">
					<div className="col-md-6 product-image">
						<img src="https://image.flaticon.com/icons/png/128/102/102348.png?ga=GA1.2.670816050.1596686111" className="card-img w-50" alt="product" />
					</div>
					<div className="col-md-6">
						<div className="card-body">
							{quantity &&
								<p className="card-text mb-0"><small className="text-muted font-weight-bold">In stock: </small><small>{quantity}</small></p>
							}
							{buyPrice &&
								<p className="card-text mb-0"><small className="text-muted font-weight-bold">Buy price: </small><small>${buyPrice}</small></p>
							}
							{salePrice &&
								<p className="card-text mb-0"><small className="text-muted font-weight-bold">Sale price: </small><small>${salePrice}</small></p>
							}
							{category &&
								<p className="card-text mb-0"><small className="text-muted font-weight-bold">Category: </small><small>{category}</small></p>
							}
						</div>
					</div>
				</div>
				<div>
					{saleAction &&
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
					}
				</div>
			</div>
		</div>
	)
}

export default Product;
