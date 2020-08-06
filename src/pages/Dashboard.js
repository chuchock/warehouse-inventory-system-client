import React, { useState, Fragment, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';

import WarehouseService from '../services/warehouseService';
import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';

const Dashboard = () => {

	const [warehousesCount, setWarehousesCount] = useState(0);
	const [categoriesCount, setCategoriesCount] = useState(0);
	const [productsCount, setProductsCount] = useState(0);

	useEffect(() => {
		WarehouseService.getWarehousesCount().then(
			(response) => {
				setWarehousesCount(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);

		CategoryService.getCategoriesCount().then(
			(response) => {
				setCategoriesCount(response.data);
			},
			(error) => {
				console.log("error: " + error);
				// const _content =
				// 	(error.response && error.response.data) ||
				// 	error.message ||
				// 	error.toString();

				// setContent(_content);
			}
		);

		ProductService.getProductsCount().then(
			(response) => {
				setProductsCount(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<Fragment>
			<div className="card-deck mb-3 text-center">
				<Card
					count={warehousesCount}
					name='Warehouses'
					image='https://image.flaticon.com/icons/png/128/18/18404.png?ga=GA1.2.670816050.1596686111' />
				<Card
					count={categoriesCount}
					name='Categories'
					image='https://image.flaticon.com/icons/png/128/50/50017.png?ga=GA1.2.670816050.1596686111' />
				<Card
					count={productsCount}
					name='Products'
					image='https://image.flaticon.com/icons/png/128/102/102348.png?ga=GA1.2.670816050.1596686111'
				/>
			</div>

			<div className="card">
				<h5 className="card-header">RECENTLY ADDED PRODUCTS</h5>
				<div className="card-body">
					<Table />
				</div>
			</div>
		</Fragment>
	);
}

export default Dashboard;