import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductNew = () => {

	const [product, updateProduct] = useState({
		name: '',
		description: '',
		quantity: 0,
		buyPrice: 0.0,
		salePrice: 0.0,
		idCategory: -1
	});

	const updateState = e => {
		updateProduct({
			...product,
			[e.target.name]: e.target.value
		})
	}

	const { name, description, quantity, buyPrice, salePrice, idCategory } = product;

	const submitProduct = e => {
		e.preventDefault();

		// restart form
		updateAppointment({
			name: '',
			description: '',
			quantity: 0,
			buyPrice: 0.0,
			salePrice: 0.0,
			idCategory: -1
		})
	}

	return (
		<Fragment>
			<Link to="/products" className="btn btn-link">Back</Link>
			<br /><br />

			<form
				onSubmit={submitProduct}
			>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder=""
						onChange={updateState}
						value={name}
					/>
				</div>

				<div className="form-group">
					<label>Description</label>
					<input
						type="text"
						className="form-control"
						name="description"
						placeholder=""
						onChange={updateState}
						value={description}
					/>
				</div>

				<div className="form-row">
					<div className="form-group col-md-4">
						<label>Quantity</label>
						<input
							type="number"
							className="form-control"
							name="quantity"
							onChange={updateState}
							value={quantity} />
					</div>
					<div className="form-group col-md-4">
						<label>Buy price</label>
						<input
							type="text"
							className="form-control"
							name="buyPrice"
							onChange={updateState}
							value={buyPrice}
						/>
					</div>
					<div className="form-group col-md-4">
						<label>Sale price</label>
						<input
							type="text"
							className="form-control"
							name="salePrice"
							onChange={updateState}
							value={salePrice}
						/>
					</div>
				</div>

				<div className="form-group">
					<label>Category</label>
					<select
						name="idCategory"
						className="form-control">
						<option>Choose...</option>
					</select>
				</div>

				<button className="btn btn-primary">Save</button>
			</form>

		</Fragment>
	);
}

export default ProductNew;