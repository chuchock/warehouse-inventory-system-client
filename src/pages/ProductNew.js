import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProductNew = () => (
	<Fragment>
		<Link to="/products" className="btn btn-link">Back</Link>
		<br /><br />

		<form>
			<div className="form-group">
				<label htmlFor="txt-name">Name</label>
				<input type="text" className="form-control" id="txt-name" placeholder="" />
			</div>

			<div className="form-group">
				<label htmlFor="">Description</label>
				<input type="text" className="form-control" id="txt-description" placeholder="" />
			</div>

			<div className="form-row">
				<div className="form-group col-md-4">
					<label htmlFor="">Quantity</label>
					<input type="number" className="form-control" id="txt-quantity" />
				</div>
				<div className="form-group col-md-4">
					<label htmlFor="">Buy price</label>
					<input type="text" className="form-control" id="txt-buyprice" />
				</div>
				<div className="form-group col-md-4">
					<label htmlFor="">Sale price</label>
					<input type="text" className="form-control" id="txt-saleprice" />
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="sel-category">Category</label>
				<select id="sel-category" className="form-control">
					<option value="" selected>Choose...</option>
				</select>
			</div>

			<button className="btn btn-primary">Save</button>
		</form>

	</Fragment>
);

export default ProductNew;