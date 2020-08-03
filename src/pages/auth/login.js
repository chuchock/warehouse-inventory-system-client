import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

	// State para iniciar sesión
	const [usuario, guardarUsuario] = useState({
		email: '',
		password: ''
	})

	// extraer de usuario
	const { email, password } = usuario;

	const onChange = e => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	// Cuando el usuario quiere iniciar sesión
	const onSubmit = e => {
		e.preventDefault();

		// Validar que no haya campos vacios
		if (email.trim() === '' || password.trim() === '') {
			// mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
		}

		// Pasarlo al action
		// iniciarSesion({ email, password });
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
							placeholder="Tu Email"
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
					Obtener Cuenta
				</Link>

			</div>
		</div>
	);
}

export default Login;