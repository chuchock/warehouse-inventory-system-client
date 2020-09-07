import { BehaviorSubject } from 'rxjs';
import axiosClient from '../config/axios';

// import config from 'config';
import { handleResponse } from '../helpers/handleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	register,
	login,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue() { return currentUserSubject.value }
};

function register(email, password) {
	const data = {
		EmailAddress: email,
		Password: password
	}

	return axiosClient.post('/api/accounts/create', data);
}

function login(username, password) {
	const data = {
		EmailAddress: username,
		Password: password
	}

	return axiosClient
		.post('/api/accounts/login', data)
		.then((response) => {
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
