import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { authenticationService } from '../services/authenticationService';

import './styles/Navbar.css';

function Navbar() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		//authenticationService.currentUser.subscribe(x => setCurrentUser(x));
	}, []);

	const logout = () => {
		authenticationService.logout();
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">

				<button type="button" id="sidebarCollapse" className="navbar-btn">
					<span></span>
					<span></span>
					<span></span>
				</button>
				<button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<i className="fas fa-align-justify"></i>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="nav navbar-nav ml-auto">
						<li className="nav-item">
							<a href="/" className="nav-link" onClick={logout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;