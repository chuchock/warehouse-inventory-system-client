import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';

const ProductNew = () => {

	const { handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm } = useFormik({
		initialValues: {
			name: '',
			description: '',
			buyPrice: 0,
			salePrice: 0,
			categoryId: ''
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("This field is required!")
				.max(50, 'Name must be shorter than 50 characters'),
			description: Yup.string()
				.required("This field is required!")
				.max(100, 'Name must be shorter than 100 characters'),
			buyPrice: Yup.number()
				.required("This field is required!").positive(),
			salePrice: Yup.number()
				.required("This field is required!").positive(),
			categoryId: Yup.string()
				.required("This field is required!")
		}),
		onSubmit: () => addProduct()
	});

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

	const addProduct = () => {
		Swal.fire({
			title: 'Are you sure to add the product?',
			text: "",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				ProductService.createProduct(values).then(
					(response) => {
						resetForm({});

						Swal.fire(
							'Done!',
							'The product has been added.',
							'success'
						)
					},
					(error) => {
						console.log("error: " + error);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!'
						});
					}
				);
			} else if (
				result.dismiss === Swal.DismissReason.cancel
			) {
				// swalWithBootstrapButtons.fire(
				// 	'Cancelled',
				// 	'Your imaginary file is safe :)',
				// 	'error'
				// )
			}
		});
	}

	return (
		<>
			<Link to="/products" className="btn btn-link">Back</Link>
			<br /><br />

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name*</label>
					<input
						type="text"
						className="form-control"
						name="name"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
					/>
					{touched.name && errors.name ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.name}
						</div>
					) : null}
				</div>

				<div className="form-group">
					<label>Description*</label>
					<input
						type="text"
						className="form-control"
						name="description"
						placeholder=""
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.description}
					/>
					{touched.description && errors.description ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.description}
						</div>
					) : null}
				</div>

				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Buy price*</label>
						<input
							type="text"
							className="form-control"
							name="buyPrice"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.buyPrice}
						/>
						{touched.buyPrice && errors.buyPrice ? (
							<div className="alert alert-danger"
								role="alert">
								{errors.buyPrice}
							</div>
						) : null}
					</div>
					<div className="form-group col-md-6">
						<label>Sale price*</label>
						<input
							type="text"
							className="form-control"
							name="salePrice"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.salePrice}
						/>
						{touched.salePrice && errors.salePrice ? (
							<div className="alert alert-danger"
								role="alert">
								{errors.salePrice}
							</div>
						) : null}
					</div>
				</div>

				<div className="form-group">
					<label>Category*</label>
					<select
						name="categoryId"
						className="form-control"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.categoryId}
					>
						<option value="">Choose category</option>
						{categories.map(category => {
							return (
								<option
									key={category.categoryId}
									value={category.categoryId}
								>{category.name}</option>
							);
						})}
					</select>
					{touched.categoryId && errors.categoryId ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.categoryId}
						</div>
					) : null}
				</div>

				<button type="submit" className="btn btn-primary">Save</button>
			</form>
		</>
	);
}

export default ProductNew;