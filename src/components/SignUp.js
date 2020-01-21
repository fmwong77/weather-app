import React, { Component, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static contextType = UserContext;
	signUp = (e) => {
		e.persist();
		e.preventDefault();
		let data = {
			username: e.target.username.value,
			password: e.target.password.value
		};

		const configObject = {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		console.log(data);

		fetch('http://127.0.0.1:3000/api/v1/users/', configObject)
			.then((response) => response.json())
			.then((message) => console.log(message));
	};

	render() {
		const { userSignUp } = this.context;
		return (
			<div className="card">
				<h5 className="card-header info-color white-text text-center py-4">
					<strong>Sign Up</strong>
				</h5>
				<br></br>
				<div className="card-body px-lg-5 pt-0">
					<form
						className="text-center"
						style={{ color: '#757575' }}
						action="#!"
						onSubmit={(e) => {
							this.signUp(e);
							userSignUp(e.target.username.value);
						}}
					>
						<div className="md-form">
							<input
								type="text"
								name="username"
								className="form-control"
								placeholder="Username"
							></input>
							<input
								type="password"
								name="password"
								className="form-control"
								placeholder="Password"
							></input>
							<button
								className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
								type="submit"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
