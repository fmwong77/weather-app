import React, { Component } from 'react';
import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import HourlyWeatherDisplay from './HourlyWeatherDisplay';
import DailyWeatherDisplay from './DailyWeatherDisplay';
import { WeatherService } from '../services/WeatherService';
import CreateNotification from './CreateNotification';
import ls from 'local-storage';
import notifier from 'simple-react-notifications';
import 'simple-react-notifications/dist/index.css';
import { WeatherContext } from '../contexts/WeatherContext';

const weatherService = new WeatherService();

class WeatherDashBoard extends Component {
	static contextType = WeatherContext;

	constructor(props) {
		super(props);
		this.state = {
			position: {
				latitude: null,
				longitude: null
			},
			weather: null,
			showCurrentWeather: false,
			showDailyWeather: false,
			// showHourlyWeather: false,
			unit: null
		};
	}

	componentDidUpdate() {
		if (this.state.unit !== this.context.unit) {
			let latitude, longitude;
			if (
				this.context.latitude === null ||
				this.context.latitude === 'Current'
			) {
				this.loadCurrentWeatherByPosition(this.state.position);
				this.loadDailyWeatherByPosition(this.state.position);
			} else {
				latitude = this.context.latitude;
				longitude = this.context.longitude;
				const position = {
					latitude,
					longitude
				};

				this.loadCurrentWeatherByPosition(position);
				this.loadDailyWeatherByPosition(position);
			}

			// this.loadHourlyWeatherByPosition(this.state.position);

			this.setState({
				unit: this.context.unit,
				latitude: this.context.latitude,
				longitude: this.context.longitude
			});
		}
	}

	componentDidMount() {
		this.getLocation();

		setInterval(() => {
			let current = new Date();
			let currentHour =
				(current.getHours() < 10 ? '0' : '') + current.getHours();

			let currentMin =
				(current.getMinutes() < 10 ? '0' : '') + current.getMinutes();

			const currentTime = `${currentHour}:${currentMin}`;

			if (ls.get('NotificationTime') === currentTime) {
				this.loadCurrentWeatherByPosition(this.state.position);
				notifier.success(this.state.weather.condition);
			}
		}, 60000);
	}

	getLocation() {
		let msg;

		/** first, test for feature support **/
		if ('geolocation' in navigator) {
			// geolocation is supported :)
			var options = {
				// enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
				enableHighAccuracy: false,
				// timeout = how long does the device have, in milliseconds to return a result?
				timeout: 5000,
				// maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
				maximumAge: 0
			};
			let self = this;

			navigator.geolocation.getCurrentPosition(
				function(position) {
					self.setState(
						{
							position: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							}
						},
						() => {
							self.loadCurrentWeatherByPosition(self.state.position);
							self.loadDailyWeatherByPosition(self.state.position);
							// self.loadHourlyWeatherByPosition(self.state.position);
						}
					);
				},
				(error) => alert(error.message),
				options
			);
		} else {
			// no geolocation :(
			msg = "Sorry, looks like your browser doesn't support geolocation";
			console.log(msg); // output error message
		}
	}

	loadCurrentWeatherByPosition(position) {
		if (!position) {
			throw Error('A valid position must be specified');
		}

		weatherService
			.getCurrentWeatherByPosition(
				position,
				this.context.unit === 'C' ? 'M' : 'I'
			)
			.then((weather) => {
				this.setState(() => ({ weather: weather, showCurrentWeather: true }));
			})
			.catch((error) => console.log(error));
	}

	loadDailyWeatherByPosition(position) {
		if (!position) {
			throw Error('A valid position must be specified');
		}

		weatherService
			.getDailyWeatherByPosition(
				position,
				this.context.unit === 'C' ? 'M' : 'I'
			)
			.then((dailyForecasts) => {
				this.setState(
					{
						dailyForecasts: dailyForecasts,
						showDailyWeather: true
					},
					() => console.log(this.state.dailyForecasts)
				);
			})
			.catch((error) => console.log(error));
	}

	loadHourlyWeatherByPosition(position) {
		if (!position) {
			throw Error('A valid position must be specified');
		}

		weatherService
			.getHourlyWeatherByPosition(
				position,
				this.context.unit === 'C' ? 'M' : 'I'
			)
			.then((hourlyForecasts) => {
				this.setState(
					{
						hourlyForecasts: hourlyForecasts,
						showHourlyWeather: true
					},
					() => console.log(this.state.hourlyForecasts)
				);
			})
			.catch((error) => console.log(error));
	}

	handleOnRefresh = () => {
		this.setState(() => ({
			showCurrentWeather: false,
			showDailyWeather: false
			// showHourlyWeather: false
		}));
		console.log(this.context.latitude);

		if (this.context.latitude === null || this.context.latitude === 'Current') {
			this.getLocation();
		} else {
			const latitude = this.context.latitude;
			const longitude = this.context.longitude;
			const position = {
				latitude,
				longitude
			};
			this.loadCurrentWeatherByPosition(position);
			this.loadDailyWeatherByPosition(position);
		}
	};

	showWeather() {
		return (
			this.state.showCurrentWeather && this.state.showDailyWeather //&&
			// this.state.showHourlyWeather
		);
	}

	showSpinner() {
		return (
			!this.state.showCurrentWeather || !this.state.showDailyWeather //||
			// !this.state.showHourlyWeather
		);
	}

	render() {
		return (
			<div>
				{this.showWeather() && (
					<div>
						<CurrentWeatherDisplay
							weather={this.state.weather ? this.state.weather : null}
							onRefresh={this.handleOnRefresh}
						/>
						<DailyWeatherDisplay
							dailyForecasts={
								this.state.dailyForecasts ? this.state.dailyForecasts : null
							}
							onRefresh={this.handleOnRefresh}
							// dailyForecasts={
							// 	this.state.dailyForecasts ? this.state.dailyForecasts : null
							// }
						/>
						<HourlyWeatherDisplay />
						hourlyForecasts=
						{this.state.hourlyForecasts ? this.state.hourlyForecasts : null}
						onRefresh={this.handleOnRefresh}
						{/* hourlyForecasts=
						{this.state.hourlyForecasts ? this.state.hourlyForecasts : null} */}
					</div>
				)}
				{this.showSpinner() && (
					<div className="w-100 text-center mt-5">
						<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
				)}
			</div>
		);
	}
}

export default WeatherDashBoard;
