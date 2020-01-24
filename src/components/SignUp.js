import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import notifier from 'simple-react-notifications';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	signUp = (e) => {
		e.persist();
		e.preventDefault();

		if (e.target.password.value !== e.target.confirm_pwd.value) {
			notifier.error('Password does not match');
		} else {
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

			fetch('http://127.0.0.1:3000/api/v1/users/', configObject)
				.then((response) => response.json())
				.then((object) => {
					switch (object.message) {
						case 'User created':
							notifier.success(
								`Welcome ${e.target.username.value}! Thank you for signing up.`
							);

							this.props.history.push('/');
							break;
						case 'User already exists':
							notifier.error(
								'Username already exists, please use another username'
							);
							break;
						default:
					}
				});
		}
	};

	render() {
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
							<input
								type="password"
								name="confirm_pwd"
								className="form-control"
								placeholder="Confirm Password"
							></input>
							<button
								className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
								type="submit"
							>
								Sign Up
							</button>
							<Link to="/">
								<button
									className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
									type="button"
								>
									Close
								</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
