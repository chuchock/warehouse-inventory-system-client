import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import CategoryService from '../services/categoryService';

const CategoryNew = () => {

	const { handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm } = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("This field is required!")
				.max(100, 'Name must be shorter than 100 characters')
		}),
		onSubmit: () => addCategory()
	});

	const addCategory = () => {
		Swal.fire({
			title: 'Are you sure to add the category?',
			text: "",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				CategoryService.createCategory(values.name).then(
					(response) => {
						resetForm({});

						Swal.fire(
							'Done!',
							'The category has been added.',
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
			<Link to="/categories" className="btn btn-link">Back</Link>
			<br /><br />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>*Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder=""
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

				<button
					type="submit"
					className="btn btn-primary">Save</button>
			</form>
		</>
	)
}

export default CategoryNew;