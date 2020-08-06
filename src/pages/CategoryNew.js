import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import CategoryService from '../services/categoryService';

const CategoryNew = () => {

	const [category, updateCategory] = useState({
		name: ''
	});

	const updateState = e => {
		updateCategory({
			...category,
			[e.target.name]: e.target.value
		})
	}

	const { name } = category;

	const submitCategory = e => {
		e.preventDefault();

		if (name.trim() === '') {
			return;
		}

		CategoryService.createCategory(category).then(
			(response) => {
				console.log(response);
				updateCategory({
					name: ''
				});
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}

	return (
		<Fragment>
			<Link to="/categories" className="btn btn-link">Back</Link>
			<br /><br />
			<form
				onSubmit={submitCategory}
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
						maxLength="200"
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary">Save</button>
			</form>
		</Fragment>
	)
}

export default CategoryNew;