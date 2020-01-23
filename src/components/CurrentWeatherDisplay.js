import React, { Component } from 'react';
// import { render } from 'node-sass';
import ls from 'local-storage';
import { WeatherContext } from '../contexts/WeatherContext';

// const getUpdateTime = (date) => {
// 	const hours = date
// 		.getHours()
// 		.toString()
// 		.padStart(2, '0');
// 	const minutes = date
// 		.getMinutes()
// 		.toString()
// 		.padEnd(2, '0');
// 	return `${hours}:${minutes}`;
// };

class CurrentWeatherDisplay extends Component {
	static contextType = WeatherContext;
	render() {
		const { weather } = this.props;

		return (
			<div className="current-weather-display" style={{ position: 'relative' }}>
				<div className="weather-location">{weather.location.name}</div>
				<div className="weather-min-max-temp">
					Feels Like: {weather.temperature.feels_like}&deg;
				</div>
				<div className="weather-current">
					<span className="weather-temp">
						{parseInt(weather.temperature.current)} &deg;&nbsp;
						<sup>{this.context.unit}</sup>
					</span>
				</div>
				<div className="weather-condition">
					<img
						className="weather-icon"
						src={weather.icon}
						alt={weather.condition}
					/>
					<span className="weather-description">{weather.condition}</span>
				</div>
				<div className="weather-min-max-temp">
					<span className="weather-description">
						Precipitation: {weather.precip}
						{this.context.unit === 'C' ? ' mm' : ' in'}
					</span>
					<br></br>
					<span className="weather-description">UV Index: {weather.uv}</span>
				</div>
				<div className="weather-min-max-temp">
					<span className="weather-description">
						Visibility: {weather.vis} {this.context.unit === 'C' ? 'km' : 'mi'}
					</span>
					<br></br>
					<span className="weather-description">
						Air Quality Index: {weather.air_quality}
					</span>
				</div>
				<div className="weather-update">Updated as of {weather.date}</div>
				<i
					className="refresh fa fa-refresh fa-3x"
					onClick={this.props.onRefresh}
				></i>
			</div>
		);
	}
}

export default CurrentWeatherDisplay;
