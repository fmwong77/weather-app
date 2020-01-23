import React, { Component, Fragment } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

class SideBar extends Component {
	static contextType = WeatherContext;

	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			user_id: null,
			locationAdded: false
		};
	}

	componentDidUpdate() {
		console.log(this.context.user_id);
		console.log(this.context.isLocationAdded);

		if (
			this.context.isLocationAdded !== this.state.locationAdded ||
			this.state.user_id !== this.context.user_id
		) {
			// if (this.state.user_id !== this.context.user_id) {

			if (this.context.user_id) {
				fetch(
					`http://127.0.0.1:3000/api/v1/favourite_locations?user_id=${this.context.user_id}`
				)
					.then((response) => response.json())
					.then((locations) =>
						this.setState({
							locations: locations,
							user_id: this.context.user_id,
							locationAdded: this.context.isLocationAdded
						})
					);
			}
		}
	}

	setLocationInContext = (e) => {
		this.context.setLocation(e.target.value);
	};

	render() {
		return (
			<form className="text-center" style={{ color: '#757575' }} action="#!">
				Forecast Location
				<select
					name="location"
					id="location"
					onChange={(event) => this.setLocationInContext(event)}
				>
					<option value={null}>Current</option>
					{this.state.locations.map((location) => (
						<option
							value={`${location.latitude},${location.longitude}`}
						>{`${location.area}, ${location.state}`}</option>
					))}
				</select>
				{/* <button type="submit" className="ui secondary button">
					Refresh Forecast
				</button> */}
			</form>
		);
	}
}

export default SideBar;
