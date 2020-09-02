import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';

const ProductNew = () => {

	const [product, setProduct] = useState({
		name: '',
		description: '',
		buyPrice: 0.0,
		salePrice: 0.0,
		categoryId: -1
	});

	const [categories, setCategories] = useState([]);

	const updateState = e => {
		setProduct({
			...product,
			[e.target.name]: e.target.value
		})
	}

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

	const { name, description, buyPrice, salePrice, categoryId } = product;

	const submitProduct = e => {
		e.preventDefault();

		ProductService.createProduct(product).then(
			(response) => {
				setProduct({
					name: '',
					description: '',
					buyPrice: 0.0,
					salePrice: 0.0,
					categoryId: -1
				});
			},
			(error) => {
				console.log("error: " + error);
			}
		);
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
					<div className="form-group col-md-6">
						<label>Buy price</label>
						<input
							type="text"
							className="form-control"
							name="buyPrice"
							onChange={updateState}
							value={buyPrice}
						/>
					</div>
					<div className="form-group col-md-6">
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
						name="categoryId"
						className="form-control"
						onChange={updateState}
					// value={categoryId}
					>
						<option
							value="-1"
						>Choose category</option>
						{categories.map(category => {
							return (
								<option
									key={category.categoryId}
									value={category.categoryId}
								>{category.name}</option>
							);
						})}
					</select>
				</div>

				<button className="btn btn-primary">Save</button>
			</form>

		</Fragment>
	);
}

export default ProductNew;