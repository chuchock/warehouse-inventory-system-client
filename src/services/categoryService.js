import authHeader from "../helpers/authHeader";
import axiosClient from '../config/axios';

const getCategories = (page = 1) => {
	return axiosClient().get(`/api/categories/?page=${page}`, { headers: authHeader() });
};

const getCategoriesCount = () => {
	return axiosClient().get('/api/categories/count', { headers: authHeader() });
};

const getCategory = (idCategory) => {
	return axiosClient().get('/api/categories/' + idCategory, { headers: authHeader() });
};

const createCategory = (category) => {
	const data = {
		name: category
	}
	return axiosClient().post('/api/categories', data, { headers: authHeader() });
};

export default {
	getCategories,
	getCategory,
	getCategoriesCount,
	createCategory
};