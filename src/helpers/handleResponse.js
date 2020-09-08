import { authenticationService } from '../services/authenticationService';

/*
The handleResponse function checks responses from the api to see 
if the request was unauthorised, forbidden or unsuccessful.
*/

export function handleResponse(response) {

	return response.text().then(text => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			if ([401, 403].indexOf(response.status) !== -1) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				authenticationService.logout();
				location.reload(true);
			}

			const error = data.title;

			console.log(error);

			return Promise.reject(error);
		}

		return data;
	});
}