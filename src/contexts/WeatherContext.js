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
			longitude: null
		};
	}

	toggleUnit = (e) => {
		this.setState({ unit: e });
	};

	toggleAuthentication = (e) => {
		this.setState({ isAuthenticated: e });
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

	render() {
		return (
			<WeatherContext.Provider
				value={{
					...this.state,
					toggleUnit: this.toggleUnit,
					toggleAuthentication: this.toggleAuthentication,
					setUserId: this.setUserId,
					setLocation: this.setLocation
				}}
			>
				{this.props.children}
			</WeatherContext.Provider>
		);
	}
}

export default WeatherContextProvider;
