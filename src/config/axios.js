import axios from 'axios';
import authHeader from "../helpers/authHeader";

// const axiosClient = axios.create({
// 	baseURL: process.env.REACT_APP_BACKEND_URL
// });

// export default axiosClient;

export default (history = null) => {
	const baseURL = process.env.REACT_APP_BACKEND_URL;

	const axiosClient = axios.create({
		baseURL: baseURL
	});

	axiosClient.interceptors.response.use(
		(response) =>
			new Promise((resolve, reject) => {
				resolve(response);
			}),
		(error) => {
			if (!error.response) {
				return new Promise((resolve, reject) => {
					reject(error);
				});
			}

			if (error.response.status === 403 || error.response.status === 401) {
				// axios.post(baseURL + '/api/accounts/renewToken', { headers: authHeader() })
				// 	.then((response) => {
				// 		console.log("llegaaaaaaaaaaaaaaaaaaaaaaaa");

				localStorage.removeItem('currentUser');

				if (history) {
					history.push("/login");
				} else {
					window.location = "/login";
				}
				// });

			} else {
				return new Promise((resolve, reject) => {
					reject(error);
				});
			}
		}
	);

	return axiosClient;
};