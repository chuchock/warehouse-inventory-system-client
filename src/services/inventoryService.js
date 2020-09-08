import authHeader from "../helpers/authHeader";
import axiosClient from '../config/axios';

const getInventoriesByWarehouse = (idWarehouse, page = 1) => {
	return axiosClient().get(`/api/warehouses/${idWarehouse}/inventories/?page=${page}`, { headers: authHeader() });
};

const createInventory = (inventory) => {
	const data = {
		productId: inventory.productId,
		warehouseId: inventory.warehouseId,
		quantity: inventory.quantity
	}
	return axiosClient().post('/api/inventories', data, { headers: authHeader() });
};

const getProductStock = (name) => {
	return axiosClient().get('/api/inventories/0/product/' + name, { headers: authHeader() });
};

export default {
	getInventoriesByWarehouse,
	createInventory,
	getProductStock
};