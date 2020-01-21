import React, { Component } from 'react';

class Authenticate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
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
						onSubmit={(event) => this.Authenticate(event)}
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
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Authenticate;
