import authHeader from "../helpers/authHeader";
import axiosClient from '../config/axios';

const getSales = (page = 1) => {
	return axiosClient().get(`/api/sales/?page=${page}`, { headers: authHeader() });
};

const makeSale = (cart) => {
	return axiosClient().post('/api/sales', cart, { headers: authHeader() });
};

const getSalesCount = () => {
	return axiosClient().get('/api/sales/count', { headers: authHeader() });
};

export default {
	getSales,
	makeSale,
	getSalesCount
};