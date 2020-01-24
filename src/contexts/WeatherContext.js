import React, { createContext, Component } from 'react';
import ls from 'local-storage';

export const WeatherContext = createContext();

class WeatherContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unit: ls.get('unit'),
			isAuthenticated: false,
			user_id: null,
			latitude: null,
			longitude: null,
			isLocationAdded: false,
			area: null,
			state: null,
			locations: []
		};
	}

	toggleUnit = (e) => {
		this.setState({ unit: e });
	};

	toggleAuthentication = (e) => {
		this.setState({ isAuthenticated: e });
	};

	setLocationAdded = () => {
		this.setState({ isLocationAdded: !this.state.isLocationAdded });
	};

	setUserId = (userid) => {
		this.setState({ user_id: userid });
	};

	setLocation = (location) => {
		if (location !== null) {
			const coordinate = location.split(',');

			this.setState({
				latitude: coordinate[0],
				longitude: coordinate[1]
			});
		} else {
			this.setState({
				latitude: null,
				longitude: null
			});
		}
	};

	setLocationArray = (locations) => {
		if (locations !== null) {
			this.setState({ locations: locations });
		} else {
			this.setState({ locations: [] });
		}
	};

	render() {
		return (
			<WeatherContext.Provider
				value={{
					...this.state,
					toggleUnit: this.toggleUnit,
					toggleAuthentication: this.toggleAuthentication,
					setUserId: this.setUserId,
					setLocation: this.setLocation,
					setLocationAdded: this.setLocationAdded,
					setLocationArray: this.setLocationArray
				}}
			>
				{this.props.children}
			</WeatherContext.Provider>
		);
	}
}

export default WeatherContextProvider;
