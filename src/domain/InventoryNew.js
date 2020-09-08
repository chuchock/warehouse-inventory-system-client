import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import WarehouseService from '../services/warehouseService';
import ProductService from '../services/productService';
import InventoryService from '../services/inventoryService';

const InventoryNew = () => {

	const { handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm } = useFormik({
		initialValues: {
			warehouseId: '',
			productId: '',
			quantity: 0
		},
		validationSchema: Yup.object({
			warehouseId: Yup.string()
				.required("This field is required!"),
			productId: Yup.string()
				.required("This field is required!"),
			quantity: Yup.number()
				.required("This field is required!").positive()
		}),
		onSubmit: () => addInventory()
	});

	const [warehouses, setWarehouses] = useState([]);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		WarehouseService.getWarehouses().then(
			(response) => {
				setWarehouses(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);

		ProductService.getProducts().then(
			(response) => {
				setProducts(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	const addInventory = () => {
		Swal.fire({
			title: 'Are you sure to add the product to the inventory?',
			text: "",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				InventoryService.createInventory(values).then(
					(response) => {
						resetForm({});

						Swal.fire(
							'Done!',
							'The product has been added to the inventory.',
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
			<Link to="/inventories" className="btn btn-link">Back</Link>
			<br /><br />

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Warehouse*</label>
					<select
						name="warehouseId"
						className="form-control"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.warehouseId}
					>
						<option
							value=""
						>Choose warehouse</option>
						{warehouses.map(warehouse => {
							return (
								<option
									key={warehouse.warehouseId}
									value={warehouse.warehouseId}
								>{warehouse.name}</option>
							);
						})}
					</select>
					{touched.warehouseId && errors.warehouseId ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.warehouseId}
						</div>
					) : null}
				</div>

				<div className="form-group">
					<label>Product*</label>
					<select
						name="productId"
						className="form-control"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.productId}
					>
						<option
							value="-1"
						>Choose product</option>
						{products.map(product => {
							return (
								<option
									key={product.productId}
									value={product.productId}
								>{product.name}</option>
							);
						})}
					</select>
					{touched.productId && errors.productId ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.productId}
						</div>
					) : null}
				</div>

				<div className="form-group">
					<label>Quantity*</label>
					<input
						type="text"
						className="form-control"
						name="quantity"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.quantity}
					/>
					{touched.quantity && errors.quantity ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.quantity}
						</div>
					) : null}
				</div>

				<button className="btn btn-primary">Save</button>
			</form>
		</>
	);
}

export default InventoryNew;