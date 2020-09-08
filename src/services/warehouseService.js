import authHeader from "../helpers/authHeader";
import axiosClient from '../config/axios';

const getWarehouses = (page = 1) => {
	return axiosClient().get(`/api/warehouses/?page=${page}`, { headers: authHeader() });
};

const getWarehousesCount = () => {
	return axiosClient().get('/api/warehouses/count', { headers: authHeader() });
};

const getWarehouse = (idWarehouse) => {
	return axiosClient().get('/api/warehouses/' + idWarehouse, { headers: authHeader() });
};

const createWarehouse = (warehouse) => {
	const data = {
		name: warehouse.name,
		address: warehouse.address
	}
	return axiosClient().post('/api/warehouses', data, { headers: authHeader() });
};

export default {
	getWarehouses,
	getWarehouse,
	getWarehousesCount,
	createWarehouse
};