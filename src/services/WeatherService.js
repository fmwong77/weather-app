import axios from 'axios';

// const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const WEATHERBIT_BASE_URL = 'http://localhost:3000/api/v1/weathers?';

const getWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					const {
						lon,
						lat,
						city_name,
						temp,
						app_temp,
						ob_time,
						state_code,
						aqi,
						uv,
						pod,
						precip,
						vis
					} = response.data.data[0];

					// const { dt, name } = response.data;
					resolve({
						air_quality: aqi,
						uv: uv,
						part_of_day: pod,
						precip: precip,
						vis: vis,
						condition: response.data.data[0].weather.description,
						date: ob_time, //new Date(dt * 1000),
						icon: `../icons/${response.data.data[0].weather.icon}.svg`,
						location: {
							name: city_name,
							latitude: lat,
							longitude: lon,
							state: state_code
						},
						temperature: {
							current: temp,
							feels_like: app_temp
						}
					});
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

const getDailyWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					const dailyForecasts = response.data.data.map((fc) => {
						return {
							condition: fc.weather.description,
							date: fc.datetime,
							icon: `../icons/${fc.weather.icon}.svg`,
							temperature: {
								current: fc.temp,
								max_temp: fc.max_temp,
								min_temp: fc.min_temp
							}
						};
					});

					resolve(dailyForecasts);
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

const getHourlyWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					const hourlyForecasts = response.data.data.map((fc) => {
						const index = fc.timestamp_local.indexOf('T');

						return {
							condition: fc.weather.description,
							time: fc.timestamp_local.substring(
								index + 1,
								fc.timestamp_local.length
							),
							icon: `../icons/${fc.weather.icon}.svg`,
							temperature: {
								current: fc.temp,
								feels_like: fc.app_temp
							}
						};
					});

					resolve(hourlyForecasts);
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

class WeatherService {
	getCurrentWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="current"&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getWeather(url);
	}

	getDailyWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="daily"&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getDailyWeather(url);
	}

	getHourlyWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="hourly"&hours=12&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getHourlyWeather(url);
	}
}

export { WeatherService };
