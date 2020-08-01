import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	render() {
		return (
			<div className="Navbar">
				<div className="container-fluid">
					<Link className="btn btn-primary" to="/categories">
						Start
					</Link>
				</div>
			</div>
		);
	}
}

export default Navbar;