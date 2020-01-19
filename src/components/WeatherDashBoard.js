import React, { Component } from 'react';
import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import HourlyWeatherDisplay from './HourlyWeatherDisplay';
import DailyWeatherDisplay from './DailyWeatherDisplay';

class WeatherDashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<CurrentWeatherDisplay />
				<DailyWeatherDisplay />
				<HourlyWeatherDisplay />
			</div>
		);
	}
}

export default WeatherDashBoard;
