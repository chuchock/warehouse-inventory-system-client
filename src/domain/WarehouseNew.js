import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import WarehouseService from '../services/warehouseService';

const WarehouseNew = () => {

	const { handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm } = useFormik({
		initialValues: {
			name: '',
			address: ''
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("This field is required!")
				.max(100, 'Name must be shorter than 100 characters'),
			address: Yup.string()
				.required("This field is required!")
				.max(200, 'Name must be shorter than 200 characters')
		}),
		onSubmit: () => addWarehouse()
	});

	const addWarehouse = () => {
		Swal.fire({
			title: 'Are you sure to add the warehouse?',
			text: "",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				WarehouseService.createWarehouse(values).then(
					(response) => {
						// props.history.push('/warehouses');
						resetForm({});

						Swal.fire(
							'Done!',
							'The warehouse has been added.',
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
			<Link to="/warehouses" className="btn btn-link">Back</Link>
			<br /><br />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name*</label>
					<input
						type="text"
						name="name"
						className="form-control"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						maxLength="100"
					/>
					{touched.name && errors.name ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.name}
						</div>
					) : null}
				</div>

				<div className="form-group">
					<label>Address*</label>
					<input
						type="text"
						name="address"
						className="form-control"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.address}
						maxLength="200"
					/>
					{touched.address && errors.address ? (
						<div className="alert alert-danger"
							role="alert">
							{errors.address}
						</div>
					) : null}
				</div>

				<button type="submit" className="btn btn-primary">Save</button>
			</form>
		</>
	);
}

export default WarehouseNew;