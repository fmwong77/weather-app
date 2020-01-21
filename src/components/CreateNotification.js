import React, { Component } from 'react';
import ls from 'local-storage';

class CreateNotification extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	CreateNotification = (e) => {
		e.preventDefault();

		ls.set('NotificationTime', e.target.time.value);
	};

	render() {
		return (
			<div className="card">
				<h5 className="card-header info-color white-text text-center py-4">
					<strong>Notification</strong>
				</h5>
				<br></br>
				<div className="card-body px-lg-5 pt-0">
					<form
						className="text-center"
						style={{ color: '#757575' }}
						action="#!"
						onSubmit={(event) => this.CreateNotification(event)}
					>
						<div className="md-form">
							<input
								type="text"
								name="time"
								className="form-control"
								placeholder="Notify me at"
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

export default CreateNotification;
