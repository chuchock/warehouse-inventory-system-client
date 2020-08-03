import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const WarehouseNew = () => {

	const [warehouse, updateWarehouse] = useState({
		name: '',
		address: ''
	});

	const updateState = e => {
		updateWarehouse({
			...warehouse,
			[e.target.name]: e.target.value
		})
	}

	const { name, address } = warehouse;

	const submitWarehouse = e => {
		e.preventDefault();

		if (name.trim() === '') {
			return;
		}
	}


	return (
		<Fragment>
			<Link to="/warehouses" className="btn btn-link">Back</Link>
			<br /><br />
			<form
				onSubmit={submitWarehouse}
			>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						name="name"
						className="form-control"
						placeholder=""
						onChange={updateState}
						value={name}
						maxLength="200"
					/>
				</div>

				<div className="form-group">
					<label>Address</label>
					<input
						type="text"
						name="address"
						className="form-control"
						placeholder=""
						onChange={updateState}
						value={address}
						maxLength="200"
					/>
				</div>

				<button type="submit" class="btn btn-primary">Save</button>
			</form>
		</Fragment>
	);
}

export default WarehouseNew;