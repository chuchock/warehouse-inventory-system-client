import React from 'react';
import { authenticationService } from '../services/authenticationService';

import './styles/Navbar.css';

function Navbar() {

	const logout = () => {
		authenticationService.logout();
	}

	const closeSideBar = () => {
		var sidebar = document.getElementById("sidebar");

		if (sidebar.classList.contains("sidebar-collapse")) {
			sidebar.classList.remove("sidebar-collapse");
			sidebar.classList.add("sidebar-show");
		} else {
			sidebar.classList.remove("sidebar-show");
			sidebar.classList.add("sidebar-collapse");
		}
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">

				<button type="button" id="sidebarCollapse" className="navbar-btn" onClick={closeSideBar}>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<div id="navbarSupportedContent">
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