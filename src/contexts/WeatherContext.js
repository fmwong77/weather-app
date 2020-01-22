import React, { createContext, Component } from 'react';
import ls from 'local-storage';

export const WeatherContext = createContext();

class WeatherContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unit: ls.get('unit'),
			isAuthenticated: false,
			user_id: null
		};
	}

	toggleUnit = (e) => {
		this.setState({ unit: e });
	};

	toggleAuthentication = (e) => {
		this.setState({ isAuthenticated: e });
	};

	setUserId = (userid) => {
		this.setState({ user_id: userid }, () => console.log(this.state.user_id));
	};

	render() {
		return (
			<WeatherContext.Provider
				value={{
					...this.state,
					toggleUnit: this.toggleUnit,
					toggleAuthentication: this.toggleAuthentication,
					setUserId: this.setUserId
				}}
			>
				{this.props.children}
			</WeatherContext.Provider>
		);
	}
}

export default WeatherContextProvider;
