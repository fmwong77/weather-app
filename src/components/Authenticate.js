import React, { Component } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';
import notifier from 'simple-react-notifications';

class Authenticate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static contextType = WeatherContext;

	authenticate = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;

		notifier.configure({
			autoClose: 3000,
			width: 275,
			position: 'top-right',
			delay: 0,
			closeOnClick: true,
			pauseOnHover: true,
			onlyLast: false,
			rtl: false,
			newestOnTop: true,
			animation: {
				in: 'zoomIn',
				out: 'zoomOut',
				duration: 400
			}
		});

		fetch(
			`http://127.0.0.1:3000/api/v1/users?username=${username}&password=${password}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.length > 0) {
					notifier.success(`Welcome ${data[0].username}!`);
					this.context.toggleAuthentication(true);
					this.context.setUserId(data[0].id);
				} else {
					notifier.error('Invalid username or password');
					this.context.toggleAuthentication(false);
				}
			});
	};

	render() {
		return (
			<div className="card">
				<h5 className="card-header info-color white-text text-center py-4">
					<strong>Sign In</strong>
				</h5>
				<br></br>
				<div className="card-body px-lg-5 pt-0">
					<form
						className="text-center"
						style={{ color: '#757575' }}
						action="#!"
						onSubmit={(e) => this.authenticate(e)}
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
								Sign In
							</button>
							<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">
								<Link to="/">Close</Link>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Authenticate;
