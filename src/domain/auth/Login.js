import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../services/authenticationService';

const Login = () => {

	const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.email("This is not a valid email")
				.required("This field is required!"),
			password: Yup.string()
				.required("This field is required!"),
		}),
		onSubmit: () => doLogin(values)
	})

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const doLogin = (data) => {
		setMessage("");
		setLoading(true);

		authenticationService.login(data.username, data.password).then(
			() => {
				window.location.reload();
			},
			(error) => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setLoading(false);
				setMessage(resMessage);
			}
		);
	};

	return (
		<div className="col-md-12">
			<div className="card card-container">
				<img
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="profile-img"
					className="profile-img-card"
				/>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Email</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.username}
						/>
						{touched.username && errors.username ? (
							<div className="alert alert-danger"
								role="alert">
								{errors.username}
							</div>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							name="password"
							id="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						{touched.password && errors.password ? (
							<div className="alert alert-danger"
								role="alert">
								{errors.password}
							</div>
						) : null}
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-primary btn-block" disabled={loading}>
							{loading && (
								<span className="spinner-border spinner-border-sm"></span>
							)}
							<span>Login</span>
						</button>
					</div>

					{message && (
						<div className="form-group">
							<div className="alert alert-danger" role="alert">
								{message}
							</div>
						</div>
					)}
				</form>

				<Link to="/register" className="">Register</Link>
			</div>
		</div>
	);
};

export default Login;