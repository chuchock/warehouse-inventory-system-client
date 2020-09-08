import authHeader from "../helpers/authHeader";
import axiosClient from '../config/axios';

const getProducts = (page = 1) => {
	return axiosClient().get(`/api/products/?page=${page}`, { headers: authHeader() });
};

const getProductsCount = () => {
	return axiosClient().get('/api/products/count', { headers: authHeader() });
};

const getProduct = (idProduct) => {
	return axiosClient().get('/api/product/' + idProduct, { headers: authHeader() });
};

const createProduct = (product) => {
	const data = {
		name: product.name,
		description: product.description,
		buyPrice: product.buyPrice,
		salePrice: product.salePrice,
		categoryId: product.categoryId,
	}
	return axiosClient().post('/api/products', data, { headers: authHeader() });
};

export default {
	getProducts,
	getProduct,
	getProductsCount,
	createProduct
};