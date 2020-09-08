import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Swal from 'sweetalert2'

import InventoryService from '../services/inventoryService';
import SaleService from '../services/saleService';

import './styles/Sales.css';

const SalesNew = () => {
	const [loading, setLoading] = useState(false);

	const [searchProduct, setSearchProduct] = useState('');

	const [products, setProducts] = useState([]);

	const [cart, setCart] = useState([]);

	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (searchProduct.trim() !== '') {
			setProducts([]);
			setLoading(true);
			setTimeout(() => {
				if (searchProduct.trim() !== '') {
					InventoryService.getProductStock(searchProduct.trim()).then(
						(response) => {
							setLoading(false);
							// Get difference between response products and cart
							const diffProducts = response.data.filter(({ inventoryId: id1 }) => !cart.some(({ inventoryId: id2 }) => id1 === id2));

							setProducts(diffProducts);
						},
						(error) => {
							setProducts([]);
							setLoading(false);
							console.log("error: " + error);
						}
					);
				} else {
					setProducts([]);
				}
			}, 400);
		} else {
			setProducts([]);
		}
	}, [searchProduct]);

	const handleSearchProduct = (e) => {
		let productName = e.target.value;
		setSearchProduct(productName);
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
		const totalCost = parseFloat(total) + parseFloat(product.product.salePrice * product.saleQuantity)
		setTotal(totalCost);

		// remove product from search list
		const newProducts = products.filter(product => product.inventoryId !== inventoryId);
		setProducts(newProducts);
	}

	const deleteProduct = (inventoryId) => {
		// calculate total
		const product = cart.find(product => product.inventoryId === inventoryId);
		const totalCost = parseFloat(total) - parseFloat(product.product.salePrice * product.saleQuantity);
		setTotal(totalCost);

		// remove product from cart array
		const newCart = cart.filter(product => product.inventoryId !== inventoryId);
		setCart(newCart);
		setSearchProduct('');
	}

	const resetSale = () => {
		setSearchProduct('');
		setProducts([]);
		setCart([]);
		setTotal(0);
	}

	const submitSale = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				SaleService.makeSale(cart).then(
					(response) => {
						resetSale();
						Swal.fire(
							'Done!',
							'The sale has been made.',
							'success'
						)
					},
					(error) => {
						console.log("error: " + error);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!'
						})
					}
				);
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				// swalWithBootstrapButtons.fire(
				// 	'Cancelled',
				// 	'Your imaginary file is safe :)',
				// 	'error'
				// )
			}
		})
	}

	return (
		<>
			<h2>Add Sale</h2>

			<Link to="/sales" className="btn btn-link">Back</Link>
			<br />

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
						<span className="font-weight-bold mr-1">Products added to cart:</span><span>{cart.length}</span>
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
											{cart.product.salePrice}
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
						<span className="font-weight-bold mr-1">Total: $ </span> {total}
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

			{loading && (
				<div className="text-center">
					<span className="spinner-border spinner-border"></span>
				</div>
			)}

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

export default SalesNew;