import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getInventoryByWarehouse = () => {
	return axios.get(API_URL + "/inventories", { headers: authHeader() });
};

export default {
	getInventoryByWarehouse
};