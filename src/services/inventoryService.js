import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getInventoriesByWarehouse = (idWarehouse) => {
	return axios.get(API_URL + "/warehouses/" + idWarehouse + "/inventories", { headers: authHeader() });
};

const createInventory = (inventory) => {
	const data = {
		productId: inventory.productId,
		warehouseId: inventory.warehouseId,
		quantity: inventory.quantity
	}
	return axios.post(API_URL + "/inventories", data, { headers: authHeader() });
};


export default {
	getInventoriesByWarehouse,
	createInventory
};