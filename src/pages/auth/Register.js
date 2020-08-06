import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { authenticationService } from '../../services/authenticationService';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 6 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 6 and 20 characters.
			</div>
		);
	}
};

const vconfirmpassword = (value, props, components) => {
	const bothUsed = components.password[0].isUsed && components.confirmPassword[0].isUsed;
	const bothChanged = components.password[0].isChanged && components.confirmPassword[0].isChanged;

	if (bothChanged && bothUsed && components.password[0].value !== components.confirmPassword[0].value) {
		return (
			<div className="alert alert-danger" role="alert">
				Passwords are not equal.
			</div>
		);
	}
};

const Register = (props) => {

	const form = useRef();
	const checkBtn = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");


	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const onChangeConfirmPassword = (e) => {
		const confirmPassword = e.target.value;
		setConfirmPassword(confirmPassword);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		setMessage("");
		setSuccessful(false);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			authenticationService.register(email, password).then(
				(response) => {
					// setMessage(response.data.message);
					setMessage("User successfully created");
					setSuccessful(true);
				},
				(error) => {
					// const resMessage =
					// 	(error.response &&
					// 		error.response.data &&
					// 		error.response.data.message) ||
					// 	error.message ||
					// 	error.toString();

					const resMessage = <ul>
						{error.response.data.map(res => <li key={res.code}>{res.description}</li>)}
					</ul>

					setMessage(resMessage);
					setSuccessful(false);
				}
			);
		}
	};

	return (
		<div className="col-md-12">
			<div className="card card-container">
				<img
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="profile-img"
					className="profile-img-card"
				/>

				<Form
					onSubmit={handleRegister}
					ref={form}>
					{!successful && (
						<div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<Input
									type="text"
									className="form-control"
									name="email"
									value={email}
									onChange={onChangeEmail}
									validations={[required, validEmail]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={password}
									onChange={onChangePassword}
									validations={[required, vpassword, vconfirmpassword]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<Input
									type="password"
									className="form-control"
									name="confirmPassword"
									value={confirmPassword}
									onChange={onChangeConfirmPassword}
									validations={[required, vpassword, vconfirmpassword]}
								/>
							</div>

							<div className="form-group">
								<button className="btn btn-primary btn-block">Sign Up</button>
							</div>
						</div>
					)}

					{message && (
						<div className="form-group">
							<div
								className={
									successful ? "alert alert-success" : "alert alert-danger"
								}
								role="alert"
							>
								{message}
							</div>
						</div>
					)}

					<CheckButton style={{ display: "none" }} ref={checkBtn} />
				</Form>
				<Link to="/" className="">Back</Link>
			</div>
		</div>
	);
};

export default Register;
