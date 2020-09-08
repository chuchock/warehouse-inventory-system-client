import axios from 'axios';

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
				localStorage.removeItem('currentUser');

				if (history) {
					history.push("/login");
				} else {
					window.location = "/login";
				}
			} else {
				return new Promise((resolve, reject) => {
					reject(error);
				});
			}
		}
	);

	return axiosClient;
};