import React, { Component, useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static contextType = WeatherContext;

	render() {
		const { unit, toggleUnit } = this.context;

		return (
			<div className="card">
				<h5 className="card-header info-color white-text text-center py-4">
					<strong>Setting</strong>
				</h5>
				<br></br>
				<div className="card-body px-lg-5 pt-0">
					<div className="md-form text-center">
						<div className="radio">
							<label>
								<input
									type="radio"
									value="C"
									checked={unit === 'C' ? true : false}
									onChange={() => toggleUnit('C')}
								/>
								&deg;&nbsp;C&nbsp;
							</label>
							<label>
								<input
									type="radio"
									value="F"
									checked={unit === 'C' ? false : true}
									onChange={() => toggleUnit('F')}
								/>
								&deg;&nbsp;F
							</label>
						</div>

						<button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">
							<Link to="/">Close</Link>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Setting;
