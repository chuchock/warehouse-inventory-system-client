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

function register(username, email, password) {
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

	const user = {
		EmailAddress: username,
		Password: password
	}

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		// body: JSON.stringify({ username, password })
		body: JSON.stringify(user)
	};

	// const apiUrl = 'http://localhost:4000';

	return fetch(`${API_URL}/api/accounts/Login`, requestOptions)
		.then(handleResponse)
		.then(user => {
			// store user details and jwt token in local storage to keep user 
			// logged in between page refreshes

			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);

			return user;
		});
}


function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
}
