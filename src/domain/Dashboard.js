import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

import WarehouseService from '../services/warehouseService';
import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';
import SaleService from '../services/saleService';

const Dashboard = () => {

	const [warehousesCount, setWarehousesCount] = useState(0);

	const [categoriesCount, setCategoriesCount] = useState(0);

	const [productsCount, setProductsCount] = useState(0);

	const [salesCount, setSalesCount] = useState(0);

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

		SaleService.getSalesCount().then(
			(response) => {
				setSalesCount(response.data);
			},
			(error) => {
				console.log("error: " + error);
			}
		);
	}, []);

	return (
		<>
			<h1>Welcome</h1>

			<div className="card-deck mb-3 text-center">
				<Card
					count={warehousesCount}
					name='Warehouses'
					url='/warehouses'
					image='https://image.flaticon.com/icons/png/128/18/18404.png?ga=GA1.2.670816050.1596686111' />
				<Card
					count={categoriesCount}
					name='Categories'
					url='/categories'
					image='https://image.flaticon.com/icons/png/128/50/50017.png?ga=GA1.2.670816050.1596686111' />
			</div>
			<div className="card-deck mb-3 text-center">
				<Card
					count={productsCount}
					name='Products'
					url='/products'
					image='https://image.flaticon.com/icons/png/128/102/102348.png?ga=GA1.2.670816050.1596686111'
				/>
				<Card
					count={salesCount}
					name='Sales'
					url='/sales'
					image='https://image.flaticon.com/icons/svg/3144/3144573.svg'

				/>
			</div>
		</>
	);
}

export default Dashboard;