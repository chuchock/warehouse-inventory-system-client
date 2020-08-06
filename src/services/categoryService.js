import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getCategories = () => {
	return axios.get(API_URL + "/categories", { headers: authHeader() });
};

const getCategoriesCount = () => {
	return axios.get(API_URL + "/categories/count", { headers: authHeader() });
};

const getCategory = (idCategory) => {
	return axios.get(API_URL + "/categories/" + idCategory, { headers: authHeader() });
};

const createCategory = (category) => {
	return axios.post(API_URL + "/categories", category, { headers: authHeader() });
};

export default {
	getCategories,
	getCategory,
	getCategoriesCount,
	createCategory
};