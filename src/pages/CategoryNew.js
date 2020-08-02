import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CategoryNew = () => (
	<Fragment>
		<Link to="/categories" className="btn btn-link">Back</Link>
		<br /><br />
		<form>
			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Name</label>
				<input type="text" className="form-control" id="txt-name" placeholder="" />
			</div>

			<button type="submit" class="btn btn-primary">Save</button>
		</form>
	</Fragment>
);

export default CategoryNew;