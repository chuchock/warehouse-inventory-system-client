import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getWarehouses = (page = 1) => {
	return axios.get(API_URL + `/warehouses/?page=${page}`, { headers: authHeader() });
};

const getWarehousesCount = () => {
	return axios.get(API_URL + "/warehouses/count", { headers: authHeader() });
};

const getWarehouse = (idWarehouse) => {
	return axios.get(API_URL + "/warehouses/" + idWarehouse, { headers: authHeader() });
};

const createWarehouse = (warehouse) => {
	const data = {
		name: warehouse.name,
		address: warehouse.address
	}
	return axios.post(API_URL + "/warehouses", data, { headers: authHeader() });
};

export default {
	getWarehouses,
	getWarehouse,
	getWarehousesCount,
	createWarehouse
};