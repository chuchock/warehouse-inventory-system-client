import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { authenticationService } from '../../services/authenticationService';

const Login = () => {

	const [user, saveUser] = useState({
		email: '',
		password: ''
	})

	const { email, password } = user;

	const onChange = e => {
		saveUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = e => {
		e.preventDefault();

		if (email.trim() === '' || password.trim() === '') {

		}

		authenticationService.login(email, password)
			.then(
				// user => {
				// 	const { from } = this.props.location.state || { from: { pathname: "/" } };
				// 	this.props.history.push(from);
				// },
				// error => {
				// 	setSubmitting(false);
				// 	setStatus(error);
				// }
			);
	}

	return (
		<div className="">
			<div className="" >
				<h1>Iniciar Sesión</h1>

				<form
					onSubmit={onSubmit}
				>
					<div className="">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Your Email"
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className="">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu Password"
							value={password}
							onChange={onChange}
						/>
					</div>

					<div className="">
						<input type="submit" className="btn btn-primario btn-block"
							value="Iniciar Sesión" />
					</div>
				</form>

				<Link to={'/nueva-cuenta'} className="enlace-cuenta">
					Get Account
				</Link>

			</div>
		</div>
	);
}

export default Login;