import React, { useState, useEffect } from 'react';
import Product from '../components/Product';

import InventoryService from '../services/inventoryService';

import './styles/Sales.css';

const Sales = () => {

	const [searchProduct, setSearchProduct] = useState('');

	const [products, setProducts] = useState([]);

	const [cart, setCart] = useState([]);

	const [total, setTotal] = useState(0.0);

	useEffect(() => {
		if (searchProduct !== '') {
			setTimeout(() => {
				InventoryService.getProductStock(searchProduct).then(
					(response) => {
						console.log(response.data)
						setProducts(response.data);
					},
					(error) => {
						console.log("error: " + error);
					}
				);
			}, 400);
		}
	}, [searchProduct]);

	const handleSearchProduct = (e) => {
		setSearchProduct(e.target.value);
	}

	const addProduct = (inventoryId, saleQuantity) => {
		// add product to cart
		const product = products.find(product => product.inventoryId === inventoryId);
		product.saleQuantity = saleQuantity;
		setCart([
			...cart,
			product
		]);

		// calculate total
		const totalCost = parseFloat(total) + parseFloat(product.product.salePrice)
		setTotal(totalCost);


		// remove product from search list
		const newProducts = products.filter(product => product.inventoryId !== inventoryId);
		setProducts(newProducts);
	}

	const deleteProduct = (inventoryId) => {
		const newCart = cart.filter(product => product.inventoryId !== inventoryId);
		setCart(newCart);
		setSearchProduct('');
	}

	const submitSale = () => {

	}

	return (
		<>
			<h2>Sales</h2>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					name="searchProduct"
					placeholder="Search a product"
					value={searchProduct}
					onChange={handleSearchProduct}
				/>
			</div>

			<div className="row">
				<div className="col-md-12">
					<div className="cart-header">
						<span className="font-weight-bold">Products added to cart:</span><span>{cart.length}</span>
					</div>
					{cart.map(cart => {
						return (
							<div key={cart.inventoryId} className="card cart-container">
								<div className="card-body">
									<div className="cart-container-product">
										<div>
											<span className="font-weight-bold">Name: </span>
											{cart.product.name}
										</div>
										<div>
											<span className="font-weight-bold">Description: </span>
											{cart.product.description}
										</div>
										<div>
											<span className="font-weight-bold">Warehouse: </span>
											{cart.warehouse.name}
										</div>
										<div>
											<span className="font-weight-bold">Price: </span>
											{cart.warehouse.salePrice}
										</div>
										<div>
											<span className="font-weight-bold">Quantity: </span>
											{cart.saleQuantity}
										</div>
										<button type="button" className="btn btn-danger" onClick={() => deleteProduct(cart.inventoryId)}>Delete</button>
									</div>
								</div>
							</div>
						);
					})
					}
					<div className="cart-summary mt-2 mb-2">
						<span className="font-weight-bold">Total: $ </span> {total}
					</div>
					<div className="cart-footer">
						<button
							type="button"
							className="btn btn-primary"
							disabled={cart.length > 0 ? "" : "disabled"}
							onClick={submitSale}>Make sale</button>
					</div>
				</div>
			</div>

			<hr />

			<div className="row">
				{products.map(product => {
					return (
						<Product
							key={product.inventoryId}
							inventoryId={product.inventoryId}
							name={product.product.name}
							description={product.product.description}
							quantity={product.quantity}
							salePrice={product.product.salePrice}
							saleAction={true}
							column={'col-md-4'}
							addProduct={addProduct}
						/>
					);
				})
				}
			</div>
		</>
	)
};

export default Sales;