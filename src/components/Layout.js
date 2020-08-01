import React from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout(props) {
	return (
		<React.Fragment>
			<Navbar />
			<Sidebar />
			{props.children}
		</React.Fragment>
	);
}

export default Layout;