import { authenticationService } from '../services/authenticationService';

/*
Auth header is a helper function that returns an HTTP Authorization header
 containing the JWT auth token of the currently logged in user. If the user isn't logged in 
 an empty object is returned.

The auth header is used to make authenticated HTTP requests to the server api using JWT a
uthentication.
*/

export function authHeader() {
	// return authorization header with jwt token
	const currentUser = authenticationService.currentUserValue;

	if (currentUser && currentUser.jwtToken) {
		return { Authorization: `Bearer ${currentUser.jwtToken}` };
	} else {
		return {};
	}
}