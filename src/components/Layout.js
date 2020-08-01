import React from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/Layout.css';

function Layout(props) {
	return (
		<div className="wrapper">
			<Sidebar />
			<div id="content">
				<Navbar />
			</div>
		</div>
	);
}

export default Layout;