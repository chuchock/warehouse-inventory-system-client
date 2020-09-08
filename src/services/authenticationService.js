import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

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

	return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/accounts/create', data);
}

function login(username, password) {
	const data = {
		EmailAddress: username,
		Password: password
	}

	return axios
		.post(process.env.REACT_APP_BACKEND_URL + '/api/accounts/login', data)
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
