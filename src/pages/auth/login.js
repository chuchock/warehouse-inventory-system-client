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
		<div>
			<div className="container mt-3">
				<div className="col-md-12">
					<div className="card card-container" >
						<img
							src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
							alt="profile-img"
							className="profile-img-card"
						/>
						<h1>Iniciar Sesión</h1>

						<form
							onSubmit={onSubmit}
						>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder="Your Email"
									value={email}
									onChange={onChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									placeholder="Tu Password"
									value={password}
									onChange={onChange}
								/>
							</div>

							<div className="form-group">
								<button
									className="btn btn-primary btn-block">
									<span>Login</span>
								</button>
							</div>
						</form>

						<Link to={'/register'} className="nav-link">
							Sign Up</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;