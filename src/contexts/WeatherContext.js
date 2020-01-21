import React, { createContext, Component } from 'react';

export const WeatherContext = createContext();

class WeatherContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { unit: 'C' };
	}

	toggleUnit = () => {
		this.setState({ unit: this.state.unit === 'C' ? 'F' : 'C' });
	};

	// handleOnRefresh = () => {
	// 	this.setState(() => ({
	// 		showCurrentWeather: false,
	// 		showDailyWeather: false,
	// 		showHourlyWeather: false,
	// 		unit: this.state.unit === 'C' ? 'F' : 'C'
	// 	}));
	// };

	render() {
		return (
			<WeatherContext.Provider
				value={{ ...this.state, toggleUnit: this.toggleUnit }}
			>
				{this.props.children}
			</WeatherContext.Provider>
		);
	}
}

export default WeatherContextProvider;
