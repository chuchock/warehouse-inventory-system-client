import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Sidebar.css';

const Sidebar = () => (
	<div id="sidebar">
		<div className="sidebar-header">
			<h3>WISYS</h3>
		</div>

		<ul className="list-unstyled components">
			{/* <p>Dummy Heading</p> */}
			{/* <li className="active">
				<a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
				<ul className="collapse list-unstyled" id="homeSubmenu">
					<li>
						<a href="#">Home 1</a>
					</li>
					<li>
						<a href="#">Home 2</a>
					</li>
					<li>
						<a href="#">Home 3</a>
					</li>
				</ul>
			</li> */}
			{/* <li>
				<a href="#">About</a>
				<a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
				<ul className="collapse list-unstyled" id="pageSubmenu">
					<li>
						<a href="#">Page 1</a>
					</li>
					<li>
						<a href="#">Page 2</a>
					</li>
					<li>
						<a href="#">Page 3</a>
					</li>
				</ul>
			</li> */}
			<li>
				<Link to="/dashboard">
					Dashboard
				</Link>
			</li>
			<li>
				<Link to="/sales">
					Sales
				</Link>
			</li>
			<li>
				<Link to="/inventories">
					Inventories
				</Link>
			</li>
			<li>
				<Link to="/warehouses">
					Warehouses
				</Link>
			</li>
			<li>
				<Link to="/categories">
					Categories
				</Link>
			</li>
			<li>
				<Link to="/products">
					Products
				</Link>
			</li>
		</ul>
		{/* 
		<ul className="list-unstyled CTAs">
			<li>
				<a href="" className="download">button 1</a>
			</li>
			<li>
				<a href="" className="article">button 2</a>
			</li>
		</ul> */}
	</div>

);

export default Sidebar;