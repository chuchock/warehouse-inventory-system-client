import { BehaviorSubject } from 'rxjs';
import axios from "axios";

// import config from 'config';
import { handleResponse } from '../helpers/handleResponse';

const API_URL = "http://localhost:4000";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	register,
	login,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue() { return currentUserSubject.value }
};

function register(email, password) {
	// return axios.post(API_URL + "/api/accounts/Create", {
	// 	username,
	// 	email,
	// 	password,
	// });
	const data = {
		EmailAddress: email,
		Password: password
	}

	return axios.post(API_URL + "/api/accounts/Create", data);
}

function login(username, password) {

	const data = {
		EmailAddress: username,
		Password: password
	}
	return axios
		.post(API_URL + "/api/accounts/Login", data)
		.then((response) => {
			console.log(response);
			if (response.data.token) {
				localStorage.setItem("currentUser", JSON.stringify(response.data.token));
			}

			return response.data;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
}
