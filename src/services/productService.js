import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getProducts = () => {
	return axios.get(API_URL + "/products", { headers: authHeader() });
};

const getProductsCount = () => {
	return axios.get(API_URL + "/products/count", { headers: authHeader() });
};

const getProduct = (idProduct) => {
	return axios.get(API_URL + "/product/" + idProduct, { headers: authHeader() });
};

const createProduct = (product) => {
	const data = {
		name: product.name,
		description: product.description,
		quantity: product.quantity,
		buyPrice: product.buyPrice,
		salePrice: product.salePrice,
		categoryId: product.categoryId,
	}
	return axios.post(API_URL + "/products", data, { headers: authHeader() });
};

export default {
	getProducts,
	getProduct,
	getProductsCount,
	createProduct
};