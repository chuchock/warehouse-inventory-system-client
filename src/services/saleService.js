import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:4000/api";

const getSales = (page = 2) => {
    //http://localhost:4000/api/sales/?recordsPerPage=100&page=1
    return axios.get(API_URL + `/sales/?recordsPerPage=10&page=${page}`, { headers: authHeader() });
};

const makeSale = (cart) => {
    return axios.post(API_URL + "/sales", cart, { headers: authHeader() });
};

export default {
    getSales,
    makeSale
};